function OptionCard(props) {
  return (
    <>
      <div class="inline-flex rounded-md shadow-sm mb-5" role="group">
        {props.col_length <= 1 ? (
          <button
            type="button"
            onClick={() => props.handleView("table")}
            class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
          >
            <i className="fi fi-rr-table"></i>
            <p className="ml-2">Data</p>
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={() => props.handleView("bar")}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <i className="fi fi-rr-stats"></i>
              <p className="ml-2">Bar</p>
            </button>
            <button
              type="button"
              onClick={() => props.handleView("line")}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <i className="fi fi-rr-chart-line-up"></i>
              <p className="ml-2">Line</p>
            </button>
            <button
              type="button"
              onClick={() => props.handleView("pie")}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <i className="fi fi-rs-chart-pie-alt"></i>
              <p className="ml-2">Pie</p>
            </button>
            <button
              type="button"
              onClick={() => props.handleView("table")}
              class="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
            >
              <i className="fi fi-rr-table"></i>
              <p className="ml-2">Data</p>
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default OptionCard;
