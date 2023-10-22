import React, { useState } from "react";

function Table(props) {
  const data = props.data.data ? props.data.data : [];
  const columns = data.length > 0 ? Object.keys(data[0]) : [];
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 5;
  const pageCount = Math.ceil(data.length / rowsPerPage);
  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentPageData = data.slice(startIndex, endIndex);
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  return (
    <>
      <table className="w-full text-sm text-left border-2 border-gray-200">
        <thead className="bg-gray-100 text-xs uppercase">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((element, index) => (
            <tr key={index} className="bg-white border-b text-gray-600">
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-3">
                  {element[column]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="container w-full flex justify-center mt-5">
        <div class="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            type="button"
            class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            onClick={handleNextPage}
            disabled={currentPage === pageCount - 1}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Table;
