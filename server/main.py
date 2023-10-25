from flask import Flask, request
from flask_cors import CORS, cross_origin
import spacy
import google.generativeai as palm
from neo4j import GraphDatabase
import json
import signal


# Environment Variables


# Neo4j database connection
def connect():
    global graph
    # graph = Graph(
    #     config["NEO4J_URL"],
    #     auth=(config["NEO4J_USER"], config["NEO4J_PASSWORD"]),
    # )
    graph = GraphDatabase.driver(
        "neo4j+ssc://11da6074.databases.neo4j.io",
        auth=("neo4j", "s4VCSjScsCexQnmJbCb__BHJkfcu6QD8oR_66kzv3hE"),
    )

    print("connected.....")


connect()

# Flask Instance
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

# Palm Instance
palm.configure(api_key="AIzaSyAM66Voz__ZZo43m-6pThWp1IeFcasF1vo")

# Spacy Module
nlp = spacy.load("en_core_web_sm")


# def run_query(query):
#     doc = nlp(query)
#     return_obj = None
#     return_identifier = None
#     for i in doc:
#         if (
#             i.dep_ == "dobj"
#         ):  # Identifying the token which is direct object of the subject
#             return_obj = str(i).upper()[:-1]
#             return_identifier = str(return_obj).lower()[0]
#     query = f"MATCH ({return_identifier}:{return_obj}) RETURN {return_identifier}"  # splitting the cypher query according to condition
#     res = graph.run(query)
#     return res


def run_query(input):
    defaults = {
        "model": "models/text-bison-001",
        "temperature": 0.8,
        "candidate_count": 1,
        "top_k": 40,
        "top_p": 0.95,
        "max_output_tokens": 1024,
        "stop_sequences": [],
        "safety_settings": [
            {"category": "HARM_CATEGORY_DEROGATORY", "threshold": 1},
            {"category": "HARM_CATEGORY_TOXICITY", "threshold": 1},
            {"category": "HARM_CATEGORY_VIOLENCE", "threshold": 2},
            {"category": "HARM_CATEGORY_SEXUAL", "threshold": 2},
            {"category": "HARM_CATEGORY_MEDICAL", "threshold": 2},
            {"category": "HARM_CATEGORY_DANGEROUS", "threshold": 2},
        ],
    }
    prompt = f"""You are an expert in converting English questions to Neo4j Cypher Graph code! The Graph has following Node Labels - USER,PROJECT,TASK,TASK_STATUS and the properties according to each label as follows,

Generate a Cypher query to match the following nodes and relations:
Nodes:

USER {{
    username: "name of the user",
    user_id: "id of the user"
}}

PROJECT {{
    project_name: "name of the project",
    project_id: "id of the project"
}}

TASK {{
    id: "id of the task",
    message: "message of the task",
    hours: "hours of the task",
    "created_at": "date when the task is created"
    "updated_at": "date when the task is updated"
}}

TASK_STATUS {{
    status_id: "id of the status",
    status_name: "name of the status"
}}

Relations:

works_on: USER -> PROJECT (label: 'works_on')
belongs_to: TASK -> PROJECT (label: 'belongs_to') 
created: USER -> TASK (label: 'created')
has_status: TASK -> TASK_STATUS (label: 'has_status')


    For example,
    Example 1 - Give me a list of all users and total number of hours did each user worked on each project
    , the Cypher command will be something like this
    MATCH(u:USER)-[:created]->(t:TASK)-[:belongs_to]->(p:PROJECT)
    RETURN u.username, p.project_name, SUM(t.hours)

    Example 2 - Which users worked on 7th August 2023, the Cypher command will be something like this
    MATCH (u:USER)-[:created]->(t:TASK {{created_at: date("2023-08-07")}}) RETURN DISTINCT u.username

    Example 3-Get all the users along with the projects they worked, the Cypher command will be something like this
    MATCH (u:USER)-[:works_on]->(p:PROJECT) RETURN u.username, p.project_name

    Example 4-Get the sum of total hours that a charan worked on Nursing Portal project along with statuses?, the Cypher command will be something like this
    MATCH (u:USER {{username: "charan"}})-[:created]->(t:TASK)-[:belongs_to]->(p:PROJECT {{project_name: "Nursing Portal"}}) 
    MATCH (t)-[:has_status]->(ts:TASK_STATUS)
    RETURN SUM(t.hours), ts.status_name

    Example 5-Get users who worked on their projects after 7th August 2023 along with their task messages, the Cypher command will be something like this
    MATCH (u:USER)-[c:created]->(t:TASK)-[:belongs_to]->(p:PROJECT) WHERE t.created_at > date("2023-08-07") RETURN u.username, p.project_name, t.message

    Example 6- list out the total hours spent by each user on each project?, the Cypher command will be something like this
    MATCH (u:USER)-[c:created]->(t:TASK)-[:belongs_to]->(p:PROJECT) RETURN u.username, p.project_name, SUM(t.hours)

    Example 7- List all the projects and their durations to complete the project, the Cypher command will be something like this
    MATCH (t:TASK)-[:belongs_to]->(p:PROJECT)
    RETURN p.project_name, duration.between(MIN(t.task_date), MAX(t.task_date)).days

    example 8-when did Nursing Portal project started?, the Cypher command will be something like this
    MATCH (t:TASK)-[:belongs_to]->(p:PROJECT {{project_name: "Nursing Portal"}})
    RETURN MIN(t.task_date)

    example 9-Which users worked between 12th June and 29th June of 2023 and what are the projects they worked on
    MATCH (u:USER)-[c:created]->(t:TASK)-[:belongs_to]->(p:PROJECT) WHERE t.created_at > date("2023-06-12") AND t.created_at < date("2023-06-29") RETURN DISTINCT u.username, p.project_name

    Dont include ``` in the output 
    {input}
    
    """

    response = palm.generate_text(**defaults, prompt=prompt)
    response_text = response.result.replace("\n", "")
    return response_text


# server
@app.route("/")
def hello():
    return "Go to postman to check the api"


@app.route("/query", methods=["POST"])
def handle_query():
    data = request.get_json()
    query = data["query"]
    generated_query = run_query(query)
    print(f"query generated: {generated_query}")
    try:
        with graph.session() as session:
            result = session.run(generated_query)
            data = {"generated_query": generated_query, "data": result.data()}
            data = json.dumps(data)
            return data
    except KeyError as e:
        return f"Invalid Request data: {str(e)}", 400
    except Exception as e:
        return f"Error retrieving data from database. Check query once!: {str(e)}", 500
