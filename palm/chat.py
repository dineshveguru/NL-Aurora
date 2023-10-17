import google.generativeai as palm
from neo4j import GraphDatabase

# from dotenv import dotenv_values

# config = dotenv_values(".env")
URI = "neo4j+s://11da6074.databases.neo4j.io"
AUTH = ("neo4j", "s4VCSjScsCexQnmJbCb__BHJkfcu6QD8oR_66kzv3hE")
driver = GraphDatabase.driver(URI, auth=AUTH)

palm.configure(api_key="AIzaSyAM66Voz__ZZo43m-6pThWp1IeFcasF1vo")


def get_answer(input):
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

USER: Represents user nodes in the graph. Properties include 'user_id' and 'username'.
PROJECT: Represents project nodes in the graph. Properties include 'project_id' and 'project_name'.
TASK: Represents task nodes in the graph. Properties include 'id', 'month_id', 'message', 'hours', and 'updated_at' which represents when the task is updated.
TASK_STATUS: Represents task status nodes in the graph. Properties include 'status_id' and 'status_name'.

Relations:

works_on: Represents the relationship between a USER (from) and a PROJECT (to). The label for this relationship is 'works_on'.
belongs_to: Represents the relationship between a TASK (from) and a PROJECT (to). The label for this relationship is 'belongs_to'.
created: Represents the relationship between a USER (from) and a TASK (to). The label for this relationship is 'created'. It has 'created_at' property which represents when the task was created by the user.
has_status: Represents the relationship between a TASK (from) and a TASK_STATUS (to). The label for this relationship is 'has_status'.
    For example,
    Example 1 - Give me a list of all users and total number of hours did each user worked on each project
    , the Cypher command will be something like this
    MATCH(u:USER)-[:created]->(t:TASK)-[:belongs_to]->(p:PROJECT)
    RETURN u.username, p.project_name, SUM(t.hours)

    Example 2 - Which users worked on 7th August 2023, the Cypher command will be something like this
    MATCH (u:USER)-[c:created {{created_at: date("2023-08-07")}}]->(t:TASK) RETURN DISTINCT u.username

    Example 3-Get all the users along with the projects they worked, the Cypher command will be something like this
    MATCH (u:USER)-[:works_on]->(p:PROJECT) RETURN u.username, p.project_name

    Example 4-Get the sum of total hours that a charan worked on Nursing Portal project along with statuses?, the Cypher command will be something like this
    MATCH (u:USER {{username: "charan"}})-[:created]->(t:TASK)-[:belongs_to]->(p:PROJECT {{project_name: "Nursing Portal"}}) 
    MATCH (t)-[:has_status]->(ts:TASK_STATUS)
    RETURN SUM(t.hours), ts.status_name

    Example 5-Get users who worked on their projects after 7th August 2023 along with their task messages, the Cypher command will be something like this
    MATCH (u:USER)-[c:created]->(t:TASK)-[:belongs_to]->(p:PROJECT) WHERE c.created_at > date("2023-08-07") RETURN u.username, p.project_name, t.message

    Example 6- list out the total hours spent by each user on each project?, the Cypher command will be something like this
    MATCH (u:USER)-[c:created]->(t:TASK)-[:belongs_to]->(p:PROJECT) RETURN u.username, p.project_name, SUM(t.hours)

    Example 7- List all the projects and their durations to complete the project, the Cypher command will be something like this
    MATCH (t:TASK)-[b:belongs_to]->(p:PROJECT)
    RETURN p.project_name, duration.between(MIN(b.task_date), MAX(b.task_date)).days

    example 8-when did Nursing Portal project started?, the Cypher command will be something like this
    MATCH (t:TASK)-[b:belongs_to]->(p:PROJECT {{project_name: "Nursing Portal"}})
    RETURN MIN(b.task_date)
    Dont include ``` in the output 
    {input}
    
    """

    response = palm.generate_text(**defaults, prompt=prompt)
    response_text = response.result.replace("\n", "")
    return response_text


# # Example usage
# query = "List out the Statuses of the project RH QMS along with total hours of each user"
# response = get_answer(query)
# print(response)

import streamlit as st


# Function to execute Cypher query and get results from Neo4j
def execute_cypher_query(query):
    with driver.session() as session:
        result = session.run(query)
        return result.data()


st.title("Aurora Chat 🤖")

# User input
user_question = st.text_input("Ask a question:")

# if st.button("Generate and Execute"):
#     # Generate Cypher query based on user question
#     cypher_query = get_answer(user_question)

#     # Execute Cypher query and get results from Neo4j
#     results = execute_cypher_query(cypher_query)

#     # Display results
#     st.write("Generated Cypher Query:")
#     st.code(cypher_query)

#     st.write("Query Results:")
#     st.write(results)
if st.button("Generate"):
    # Generate Cypher query based on user question
    cypher_query = get_answer(user_question)

    # Execute Cypher query and get results from Neo4j
    results = execute_cypher_query(cypher_query)

    # Display results
    st.write("Generated Cypher Query:")
    st.code(cypher_query)

    st.write("Query Results:")

    # Check if there are results to display
    if results:
        # Convert results to a list of dictionaries for displaying in a table
        data = [dict(row) for row in results]

        # Display results in a table
        st.table(data)
    else:
        st.write("No results found.")
