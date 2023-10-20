import OptionCard from "./OptionCard";

function Table(props) {
  return (
    <>
      <OptionCard />
      <table className="w-full text-sm text-left border-2 border-gray-200">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            <th scope="col" className="px-6 py-3">
              Firstname
            </th>
            <th scope="col" className="px-6 py-3">
              Lastname
            </th>
            <th scope="col" className="px-6 py-3">
              Age
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b text-gray-600">
            <td className="px-6 py-3">Jill</td>
            <td className="px-6 py-3">Smith</td>
            <td className="px-6 py-3">50</td>
          </tr>
          <tr className="bg-white border-b text-gray-600">
            <td className="px-6 py-3">Eve</td>
            <td className="px-6 py-3">Jackson</td>
            <td className="px-6 py-3">94</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Table;
