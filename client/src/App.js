import "./App.css";
import Input from "./components/Input";
import axios from "axios";
import Response from "./components/Response";
import React, { useState } from "react";

function App() {
  // const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState([]);

  function queryHandler(e) {
    setQuery(e.target.value);
  }

  function submitHandler() {
    axios.post("http://localhost:5000/query", { query }).then((res) => {
      // setData(res.data);
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
        {console.log(responses.reverse())}
        {responses
          .slice(0)
          .reverse()
          .map((response) => response)}
      </div>
    </div>
  );
}

export default App;
