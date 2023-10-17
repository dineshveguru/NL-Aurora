import React, { useState, useEffect } from "react";
import "../index.css";
import Dashboards from "@highcharts/dashboards/es-modules/masters/dashboards.src.js";
import DataGrid from "@highcharts/dashboards/es-modules/DataGrid/DataGrid";
import Highcharts from "highcharts/es-modules/masters/highcharts.src.js";
import HighchartsPlugin from "@highcharts/dashboards/es-modules/Dashboards/Plugins/HighchartsPlugin";
import DataGridPlugin from "@highcharts/dashboards/es-modules/Dashboards/Plugins/DataGridPlugin";

HighchartsPlugin.custom.connectHighcharts(Highcharts);
Dashboards.PluginHandler.addPlugin(HighchartsPlugin);

DataGridPlugin.custom.connectDataGrid(DataGrid);
Dashboards.PluginHandler.addPlugin(DataGridPlugin);

function Response(props) {
  console.log(props);
  const data = props.data.data ? props.data.data : [];
  const containerId = `container_${props.query.replace(/\s+/g, "_")}`;
  const [activeButton, setActiveButton] = useState("graph");
  const [showGraph, setShowGraph] = useState(false);
  // let dataKeys = props.data.data ? Object.keys(data[0]) : [];
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const generatedQuery = props.data.generated_query;
  const [currentPage, setCurrentPage] = useState(0);
  const [xAxis, setXAxis] = useState(columns.length > 0 ? columns[0] : "");
  const [yAxis, setYAxis] = useState(columns.length > 0 ? columns[0] : "");
  const [slice, setSlice] = useState(columns.length > 0 ? columns[0] : "");
  const [chartType, setChartType] = useState("bar");
  const [config, setConfig] = useState({
    chart: {
      type: chartType,
    },
    title: {
      text: xAxis + " vs " + yAxis,
      align: "left",
    },
    xAxis: {
      title: {
        text: xAxis,
      },
      categories: data.map((item) => item[xAxis]),
    },
    yAxis: {
      title: {
        text: yAxis,
      },
    },
    legend: {
      layout: "vertical",
      style: {
        left: "auto",
        bottom: "auto",
        right: "50px",
        top: "100px",
      },
    },
    series: [
      {
        name: yAxis,
        data: data.map((item) => item[yAxis]),
      },
    ],
  });

  // Extract all unique key2 values from the data

  // Calculate the number of pages based on the number of rows per page
  const rowsPerPage = 10;
  const pageCount = Math.ceil(data.length / rowsPerPage);

  // Calculate the index of the first and last rows to display
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  // Get the subset of data to display on the current page
  const currentPageData = data.slice(startIndex, endIndex);

  // Handle the next page button click
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const graphClickHandler = () => {
    console.log(data);
  };

  // Handle the previous page button click
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    if (chartType === "bar" || chartType === "spline") {
      setConfig({
        chart: {
          type: chartType,
        },
        title: {
          text: xAxis + " vs " + yAxis,
          align: "left",
        },
        xAxis: {
          title: {
            text: xAxis,
          },
          categories: data.map((item) => item[xAxis]),
        },
        yAxis: {
          title: {
            text: yAxis,
          },
        },
        legend: {
          layout: "vertical",
          style: {
            left: "auto",
            bottom: "auto",
            right: "50px",
            top: "100px",
          },
        },
        series: [
          {
            name: yAxis,
            data: data.map((item) => item[yAxis]),
          },
        ],
      });
    } else if (chartType === "pie") {
      setConfig({
        chart: {
          type: chartType,
        },
        title: {
          text: xAxis + " vs " + yAxis,
          align: "left",
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "{point.name}: {point.percentage:.1f}%",
            },
            showInLegend: true,
          },
        },
        series: [
          {
            name: yAxis,
            data: data.map((item) => ({
              name: item[slice],
              y: item[yAxis],
            })),
          },
        ],
      });
    }
  }, [chartType, slice, xAxis, yAxis, props]);

  useEffect(() => {
    const chart = Highcharts.chart(containerId, config);
    // return () => {
    //   chart.destroy();
    // };
  }, [config, props]);

  return (
    <div className="response__block">
      <div className="response__header">
        <h3>
          <u>Query:</u> <span style={{ color: "#333" }}>{props.query}</span>
        </h3>
      </div>
      <div className="response__body">
        <h3>
          <u>Generated Query:</u>{" "}
          <span style={{ color: "#333" }}>{generatedQuery}</span>
        </h3>
        <div className="view_switcher">
          <button
            // onClick={() => {
            //   () => setShowGraph(true);
            //   () => setActiveButton("data");
            // }}
            onClick={() => {
              setShowGraph(true);
              setActiveButton("data");
            }}
            style={
              activeButton === "data" ? { backgroundColor: "dodgerblue" } : {}
            }
          >
            Data
          </button>
          <button
            // onClick={() => {
            //   () => setShowGraph(false);
            //   () => setActiveButton("graph");
            // }}
            onClick={() => {
              setShowGraph(false);
              setActiveButton("graph");
            }}
            style={
              activeButton === "graph" ? { backgroundColor: "dodgerblue" } : {}
            }
          >
            Graph
          </button>
        </div>
        <h3>Response: </h3>
        {data.length <= 0 ? (
          <p style={{ color: "#D21F3C" }}>
            <i>No data Generated! Retry once</i>
          </p>
        ) : showGraph ? (
          <div>
            <table style={{ borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      scope="col"
                      style={{
                        backgroundColor: "#222",
                        color: "#fff",
                        border: "1px solid white",
                        padding: "5px 10px",
                      }}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentPageData.map((element, index) => (
                  <tr key={index}>
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        style={{
                          border: "1px solid #ccc",
                          padding: "5px 10px",
                        }}
                      >
                        {element[column]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
              }}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                Previous
              </button>
              <span style={{ margin: "0 10px", color: "#fff" }}>
                Page {currentPage + 1} of {pageCount}
              </span>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleNextPage}
                disabled={currentPage === pageCount - 1}
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <h1>Select chart Type</h1>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
              >
                <option value="bar" key="bar">
                  Bar Chart
                </option>
                <option value="pie" key="pie">
                  Pie Chart
                </option>
                <option value="spline" key="line">
                  Line Chart
                </option>
              </select>
            </div>
            {chartType === "bar" || chartType === "spline" ? (
              <div>
                <div>
                  <h1>X-Axis</h1>
                  <select
                    value={xAxis}
                    onChange={(e) => setXAxis(e.target.value)}
                  >
                    {data
                      ? Object.keys(data[0]).map((key) => (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        ))
                      : []}
                  </select>
                </div>
                <div>
                  <h1>Y-Axis</h1>
                  <select
                    value={yAxis}
                    onChange={(e) => setYAxis(e.target.value)}
                  >
                    {data
                      ? Object.keys(data[0]).map((key) => (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        ))
                      : []}
                  </select>
                </div>
              </div>
            ) : (
              <div>
                <h1>Select Slice data to show</h1>
                <select
                  value={slice}
                  onChange={(e) => setSlice(e.target.value)}
                >
                  {data
                    ? Object.keys(data[0]).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))
                    : []}
                </select>
              </div>
            )}
            <div id={containerId}></div>
          </div>
        )}
      </div>
      {/* <button onClick={graphClickHandler}>Graph</button> */}
      {/* <Graph data={data} /> */}
      {/* {props && props.data.data.length > 0 && <Graph data={data} />} */}
    </div>
  );
}

export default Response;
