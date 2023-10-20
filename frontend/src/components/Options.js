function Options(props) {
  return (
    <>
      <div className="container bg-gray-400 w-fit h-fit p-2 gap-1">
        <i className={props.option}></i>
      </div>
    </>
  );
}

export default Options;
