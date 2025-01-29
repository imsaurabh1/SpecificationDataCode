// Search Component 

import React, { useState } from "react";

const SearchFilter = ({ data, setFilteredData, resetSorting }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // searching logic - converts to lower case and checks it with all columns
  const handleSearch = (term) => {
    setSearchTerm(term);

    const lowerCaseSearch = term.toLowerCase();
    const filtered = data.filter((item) => {
      return (
        item.label.toLowerCase().includes(lowerCaseSearch) ||
        item.category.toLowerCase().includes(lowerCaseSearch) ||
        (item.system_value &&
          String(item.system_value).toLowerCase().includes(lowerCaseSearch)) ||
        (item.user_value &&
          String(item.user_value).toLowerCase().includes(lowerCaseSearch)) ||
        item.name.toLowerCase().includes(lowerCaseSearch) ||
        (item.note && item.note.toLowerCase().includes(lowerCaseSearch))
      );
    });

    setFilteredData(filtered);
  };

  return (
    <div className="search-filter-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search by label..."
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {/* Reset Sorting Button */}
      <button className="reset-btn" onClick={resetSorting}>
        Reset Sorting
      </button>
    </div>
  );
};

export default SearchFilter;
