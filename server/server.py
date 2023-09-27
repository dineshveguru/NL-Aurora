from flask import Flask, request, jsonify
import spacy
from neo4j import GraphDatabase

# Initialize the Flask application and spaCy model
app = Flask(__name__)
nlp = spacy.load("en_core_web_sm")
# Initialize the Neo4j graph connection
uri = "neo4j+s://11da6074.databases.neo4j.io"  # Replace with your Neo4j server URI
user = "neo4j"  # Replace with your Neo4j username
password = "s4VCSjScsCexQnmJbCb__BHJkfcu6QD8oR_66kzv3hE"
driver = GraphDatabase.driver(uri, auth=(user, password))


# uri = "neo4j+s://21769e3d.databases.neo4j.io"  # Replace with your Neo4j server URI
# user = "neo4j"         # Replace with your Neo4j username
# password = "sNLsVe6joJjNuRTNjOZRCoVJRSeNAMmAT1zr4-fiA_g"
# Function to run the Cypher query
def run_query(query, driver):
    doc = nlp(query)
    return_obj = None
    return_identifier = None
    # def connect():
    #     global graph
    #     graph = Graph("neo4j+s://11da6074.databases.neo4j.io", auth = ("neo4j", "s4VCSjScsCexQnmJbCb__BHJkfcu6QD8oR_66kzv3hE"))
    #     tx = graph.begin()
    #     print("connected.....")
    # connect()
    for i in doc:
        if (
            i.dep_ == "dobj"
        ):  # Identifying the token which is the direct object of the subject
            return_obj = str(i).upper()[:-1]
            return_identifier = str(return_obj).lower()[0]
    query = f"MATCH ({return_identifier}:{return_obj}) RETURN {return_identifier}"  # splitting the Cypher query according to condition
    # res = graph.run(query).to_table()  # Assuming 'graph' is defined elsewhere
    with driver.session() as session:
        result = session.run(query)
    return result


# Route to handle the Cypher query
@app.route("/query", methods=["POST"])
def handle_query():
    data = request.get_json()
    query = data["query"]
    result = run_query(query, driver)  # Pass the 'driver' to the run_query function
    return jsonify({"result": result})


# Test statements
test_statements = [
    "Get all the users",
    "Get all the projects",
    "List all the projects",
    "List all the users",
]

# Run the test statements
for statement in test_statements:
    print(run_query(statement, driver))

if __name__ == "_main_":
    app.run(debug=True)
