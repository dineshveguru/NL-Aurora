from flask import Flask, request
from flask_cors import CORS, cross_origin
from py2neo import *
from dotenv import dotenv_values
import spacy

# Environment Variables
config = dotenv_values(".env")


# Neo4j database connection
def connect():
    global graph
    graph = Graph(
        config["NEO4J_URL"],
        auth=(config["NEO4J_USER"], config["NEO4J_PASSWORD"]),
    )
    tx = graph.begin()
    print("connected.....")


connect()

# Flask Instance
app = Flask(__name__)
cors = CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"


# Spacy Module
nlp = spacy.load("en_core_web_sm")


def run_query(query):
    doc = nlp(query)
    return_obj = None
    return_identifier = None
    for i in doc:
        if (
            i.dep_ == "dobj"
        ):  # Identifying the token which is direct object of the subject
            return_obj = str(i).upper()[:-1]
            return_identifier = str(return_obj).lower()[0]
    query = f"MATCH ({return_identifier}:{return_obj}) RETURN {return_identifier}"  # splitting the cypher query according to condition
    res = graph.run(query)
    return res


# server
@app.route("/")
def hello():
    return "Go to postman to check the api"


@app.route("/query", methods=["POST"])
def handle_query():
    data = request.get_json()
    query = data["query"]
    result = run_query(query).data()
    # return jsonify({"result": result})
    # print(result)
    return result
