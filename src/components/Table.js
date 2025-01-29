//Table Component

import React from "react";
import Sort from "./Sort";

const Table = ({ data, currentPage, rowsPerPage, onSort, sortConfig }) => {
  
  //logic to display data based on rowsPerPage, current page
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <table className="data-table">
      <colgroup>
        <col style={{ width: "20%" }} /> 
        <col style={{ width: "15%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "15%" }} />
        <col style={{ width: "35%" }} />
      </colgroup>
      <thead>
        {/* Dynamic columns loading */}
        <tr>
          {[
            { key: "label", label: "Label" },
            { key: "category", label: "Category" },
            { key: "system_value", label: "System Value" },
            { key: "user_value", label: "User Value" },
            { key: "note", label: "Note" },
          ].map((column) => (
            <th
              key={column.key}
              className={`sortable-header ${
                sortConfig.key === column.key ? "active" : ""  // makes the col header active if it is sorted
              }`}
              onClick={() =>
                onSort(
                  column.key,
                  sortConfig.key === column.key && sortConfig.direction === "asc"
                    ? "desc"
                    : "asc"
                )
              }
            >
              <div className="header-content">
                <span className="header-label">{column.label}</span>
                <Sort columnKey={column.key} sortConfig={sortConfig} onSort={onSort} />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
      {/* render rows */}
        {currentData.map((item) => (
          <tr key={item.id}>
            <td>{item.label}</td>
            <td>{item.category}</td>
            <td>{item.system_value}</td>
            <td>{item.user_value}</td>
            <td>{item.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
