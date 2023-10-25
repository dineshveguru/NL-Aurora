import React, { useEffect, useState } from "react";
import Dashboards from "@highcharts/dashboards/es-modules/masters/dashboards.src.js";
import DataGrid from "@highcharts/dashboards/es-modules/DataGrid/DataGrid";
import Highcharts from "highcharts/es-modules/masters/highcharts.src.js";
import HighchartsPlugin from "@highcharts/dashboards/es-modules/Dashboards/Plugins/HighchartsPlugin";
import DataGridPlugin from "@highcharts/dashboards/es-modules/Dashboards/Plugins/DataGridPlugin";

HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.PluginHandler.addPlugin(HighchartsPlugin);

DataGridPlugin.custom.connectDataGrid(DataGrid);
Dashboards.PluginHandler.addPlugin(DataGridPlugin);
function Bar(props) {
  const categorical_cols = props.transformed["strings"];
  const numerical_cols = props.transformed["nums"];
  const [xAxis, setXAxis] = useState(categorical_cols[0]);
  const [yAxis, setYAxis] = useState(numerical_cols[0]);
  useEffect(() => {
    Highcharts.chart(`bar${props.id}`, {
      chart: {
        type: "column",
        zooming: true,
      },
      title: {
        text: `${xAxis} vs ${yAxis}`,
      },
      xAxis: {
        categories: props.data.map((item) => item[xAxis]),
        title: {
          text: xAxis,
        },
        accessibility: {
          description: { xAxis },
        },
      },
      yAxis: {
        min: 0,
        tickInterval: 2,
        title: {
          text: yAxis,
        },
        labels: {
          overflow: "justify",
          format: "{value}",
        },
      },
      plotOptions: {
        column: {
          dataLabels: {
            enabled: true,
            format: "{y}",
          },
        },
      },
      tooltip: {
        valueSuffix: " hours",
        stickOnContact: true,
      },
      legend: {
        enabled: true,
      },
      series: [
        {
          name: xAxis,
          data: props.data.map((item) => item[yAxis]),
          color: "#1E90FF",
        },
      ],
    });
  }, [xAxis, yAxis]);
  return (
    <>
      <div className="relative w-full">
        <div className="w-full flex justify-around mb-5">
          <div>
            <label>Select Categorical Value</label>
            <select
              value={xAxis}
              className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-gray-600"
              onChange={(e) => setXAxis(e.target.value)}
            >
              {categorical_cols.map((col) => (
                <option value={col} className="hover:bg-red-200">
                  {col}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Select Numerical Value</label>
            <select
              value={yAxis}
              className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-gray-600"
              onChange={(e) => setYAxis(e.target.value)}
            >
              {numerical_cols.map((col) => (
                <option value={col} className="hover:bg-red-200">
                  {col}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div id={`bar${props.id}`} className="rounded-lg"></div>
    </>
  );
}

export default Bar;
