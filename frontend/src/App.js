// Imports
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Header from "./components/Header";
import Input from "./components/Input";
import Card from "./components/Card";
import transform from "./helpers/transform";

export default function App() {
  //States

  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");

  //Functions

  function queryHandler(e) {
    setQuery(e.target.value);
    console.log(query);
  }

  data && transform(data);

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

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      console.log("clicked");
      getData();
    },
    [query]
  );

  // useEffect(() => {
  //   getData();
  // }, []);
  console.log(data);
  return (
    <div className="App bg-white pt-16 w-full h-screen">
      <Header />
      <div className="flex w-full justify-center flex-col items-center gap-5">
        <Input
          query={query}
          queryHandler={queryHandler}
          handleSubmit={handleSubmit}
        />
        <Card />
      </div>
      {data ? "Data Loaded! Check the console once." : "Loading..."}
    </div>
  );
}
