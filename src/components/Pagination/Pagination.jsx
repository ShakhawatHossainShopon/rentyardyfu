export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Determine the page numbers to display around the current page
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, currentPage + 2);

  // Generate the page numbers to display
  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav
      aria-label="Page navigation example"
      className="flex justify-center py-6"
    >
      <ul className="flex flex-wrap space-x-1 text-base">
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-dark-light disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:text-gray-500"
          >
            Previous
          </button>
        </li>

        {/* Display the calculated range of page numbers */}
        {pageNumbers.map((page) => (
          <li key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 ${
                page === currentPage
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-dark-primary dark:hover:bg-dark-light"
                  : "text-black hover:bg-gray-200 dark:hover:bg-dark-light dark:text-blue-600"
              }`}
            >
              {page}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-dark-light disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:text-gray-500"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
