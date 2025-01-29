//Sorting Component

import React from "react";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SwapVertIcon from "@mui/icons-material/SwapVert";

const Sort = ({ columnKey, sortConfig, onSort }) => {

  //sorting logic
  const handleSort = () => {
    const direction =
      sortConfig.key === columnKey && sortConfig.direction === "asc"
        ? "desc"
        : "asc";
    onSort(columnKey, direction);
  };

  //displaying correct icon on respetive sorting 
  const getSortIcon = () => {
    if (sortConfig.key === columnKey) {
      return sortConfig.direction === "asc" ? (
        <ArrowUpwardIcon fontSize="small" />
      ) : (
        <ArrowDownwardIcon fontSize="small" />
      );
    }
    return <SwapVertIcon fontSize="small" />;
  };

  return (
    <span
      className="sort-icon-wrapper"
      onClick={handleSort}
      style={{ cursor: "pointer", display: "inline-block" }}
    >
      {getSortIcon()}
    </span>
  );
};


// additonal check - for all columns be default sorting is done alphabetically and for system value and user value it is done numerically
export const sortData = (data, key, direction) => {
  return [...data].sort((a, b) => {
    if (key === "system_value" || key === "user_value") {
      const numA = parseFloat(a[key]);
      const numB = parseFloat(b[key]);
      return direction === "asc" ? numA - numB : numB - numA;
    } else {
      return direction === "asc"
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    }
  });
};

export default Sort;
