//Pagination Component

import React from "react";

const Pagination = ({
  totalRows,
  rowsPerPage,
  currentPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage); // total number of pages calculation

  return (
    <div className="pagination-container">
      <div>
        Page {currentPage} of {totalPages}
      </div>
      <div className="pagination-buttons">
        <button
          disabled={currentPage === 1} //disable on page 1
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>
        <button
          disabled={currentPage === totalPages} //disable on last page
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
      
      {/* pagination dropdown */}
      <select
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
      >
        <option value={10}>Show 10</option>
        <option value={15}>Show 15</option>
        <option value={20}>Show 20</option>
      </select>
    </div>
  );
};

export default Pagination;
