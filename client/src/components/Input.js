function Input(props) {
  return (
    <div className="input__container">
      <input
        type="text"
        className="input__field"
        value={props.query}
        placeholder="Enter your query here"
        onChange={props.queryHandler}
        autoFocus
      />
      <button
        className="input__btn"
        onClick={props.submitHandler}
        type="submit"
      >
        Generate
      </button>
    </div>
  );
}

export default Input;
