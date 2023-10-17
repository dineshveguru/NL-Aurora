import "./App.css";
import Input from "./components/Input";
import axios from "axios";
import Response from "./components/Response";
import React, { useState } from "react";
import Graph from "./components/Graph";

function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState([]);

  function queryHandler(e) {
    setQuery(e.target.value);
  }

  function submitHandler() {
    axios.post("http://127.0.0.1:5000/query", { query }).then((res) => {
      setData(res.data);
      setResponses([...responses, <Response query={query} data={res.data} />]);
      setQuery("");
    });
  }
  return (
    <div className="App">
      <div className="field__container">
        <Input
          queryHandler={queryHandler}
          submitHandler={submitHandler}
          query={query}
        />
      </div>
      <div className="responses__container">
        {responses
          .slice(0)
          .reverse()
          .map((response) => response)}
      </div>
      {/* {data && data.data.length > 0 && <Graph data={data} />} */}
      {/* {data.length > 0 && <Graph data={data} />} */}
    </div>
  );
}

export default App;
