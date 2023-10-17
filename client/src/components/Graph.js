import React, { useEffect, useState } from "react";
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
export default function Graph(props) {
  console.log(props);
  let dataKeys = props.data ? Object.keys(props.data[0]) : [];
  const [xAxis, setXAxis] = useState(props.data ? dataKeys[0] : "");
  const [yAxis, setYAxis] = useState(props.data ? dataKeys[0] : "");
  const [slice, setSlice] = useState(props.data ? dataKeys[0] : "");
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
      categories: props.data.map((item) => item[xAxis]),
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
        data: props.data.map((item) => item[yAxis]),
      },
    ],
  });
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
          categories: props.data.map((item) => item[xAxis]),
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
            data: props.data.map((item) => item[yAxis]),
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
            data: props.data.map((item) => ({
              name: item[slice],
              y: item[yAxis],
            })),
          },
        ],
      });
    }
  }, [chartType, slice, xAxis, yAxis, props]);
  useEffect(() => {
    const chart = Highcharts.chart("container", config);
    // return () => {
    //   chart.destroy();
    // };
  }, [config, props]);
  return (
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
            <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
              {props.data
                ? Object.keys(props.data[0]).map((key) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))
                : []}
            </select>
          </div>
          <div>
            <h1>Y-Axis</h1>
            <select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
              {props.data
                ? Object.keys(props.data[0]).map((key) => (
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
          <select value={slice} onChange={(e) => setSlice(e.target.value)}>
            {props.data
              ? Object.keys(props.data[0]).map((key) => (
                  <option key={key} value={key}>
                    {key}
                  </option>
                ))
              : []}
          </select>
        </div>
      )}
      <div id="container"></div>
    </div>
  );
}
