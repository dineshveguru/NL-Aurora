import Options from "./Options";

function OptionCard() {
  const options = [
    "fi fi-rr-stats",
    "fi fi-rr-chart-line-up",
    "fi fi-rs-chart-pie-alt",
    "fi fi-rr-table",
  ];
  return (
    <>
      <div className="flex bg-gray-400 h-fit w-fit mb-5 px-2 py-2 rounded-md">
        {options.map((option) => (
          <Options option={option} />
        ))}
      </div>
    </>
  );
}

export default OptionCard;
