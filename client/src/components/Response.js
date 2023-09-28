import React from "react";

function Response(props) {
  const data = props.data;

  const columns = Array.from(
    new Set(
      data.flatMap((element) =>
        Object.keys(element).flatMap((key) => Object.keys(element[key]))
      )
    )
  );

  return (
    <div className="response__block">
      <div className="response__header">
        <h3 style={{ color: "#fff" }}>
          Query: <span style={{ color: "#fff" }}>{props.query}</span>
        </h3>
      </div>
      <div className="response__body">
        <h3 style={{ color: "#fff" }}>Response: </h3>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column}
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
            {data.map((element, index) => (
              <tr key={index}>
                {columns.map((column) => (
                  <td
                    key={column}
                    style={{
                      color: "#fff",
                      border: "1px solid white",
                      padding: "5px 10px",
                    }}
                  >
                    {Object.keys(element)
                      .flatMap((key) => Object.keys(element[key]))
                      .includes(column)
                      ? element[
                          Object.keys(element).find((key) =>
                            Object.keys(element[key]).includes(column)
                          )
                        ][column]
                      : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Response;
