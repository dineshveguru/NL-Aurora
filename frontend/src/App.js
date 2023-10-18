// Imports
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Input from "./components/Input";

export default function App() {
  //States

  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");

  //Functions

  function queryHandler(e) {
    setQuery(e.target.value);
  }

  async function getData() {
    try {
      const response = await axios.post("http://127.0.0.1:5000/query", {
        query,
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  console.log(data);
  return (
    <div className="App bg-white pt-16 w-full h-screen">
      <Header />
      <div className="flex w-full justify-center">
        <Input query={query} queryHandler={queryHandler} />
      </div>
    </div>
  );
}
