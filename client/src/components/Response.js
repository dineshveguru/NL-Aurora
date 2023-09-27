function Response(props) {
  return (
    <div className="response__block">
      <div className="query__card">
        <h3 className="query" style={{ color: "#fff" }}>
          Query: {props.query}
        </h3>
        <div className="response__body">
          <h3 style={{ color: "#fff" }}>Response: </h3>
          {props.data.map((element, index) => (
            <div key={index}>
              {Object.keys(element).map((key) => (
                <div key={key}>
                  {Object.keys(element[key]).map((key2) => (
                    <p>
                      <span key={key2} style={{ color: "#fff" }}>
                        {key2}
                      </span>
                      -
                      <span key={key2} style={{ color: "#fff" }}>
                        {element[key][key2]}
                      </span>
                    </p>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Response;
