import React, { useState } from "react";
import Table from "./Table";
import OptionCard from "./OptionCard";
import transform from "../helpers/transform";
import Bar from "./Bar";
import Line from "./Line";
import Pie from "./Pie";

function Card(props) {
  const [view, setView] = useState("table");
  const col_length = Object.keys(props.data.data[0]).length;
  const handleView = (view) => {
    setView(view);
  };
  console.log(props.data);
  const transformed = transform(props.data.data);

  return (
    <div className="w-5/6 rounded-lg bg-gray-200 px-10 py-10">
      <OptionCard handleView={handleView} col_length={col_length} />
      {view === "table" ? (
        <Table data={props.data} />
      ) : view === "bar" ? (
        <Bar data={props.data.data} transformed={transformed} id={props.id} />
      ) : view === "line" ? (
        <Line data={props.data.data} transformed={transformed} id={props.id} />
      ) : view === "pie" ? (
        <Pie data={props.data.data} transformed={transformed} id={props.id} />
      ) : (
        "Invalid Visual Selection!"
      )}
    </div>
  );
}

export default Card;
