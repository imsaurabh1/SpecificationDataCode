import React, { useState, useEffect } from "react";
import useFetchData from "./hooks/useFetchData";
import SearchFilter from "./components/SearchFilter";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import SidePanel from "./components/SidePanel";
import Header from "./components/Header";
import { sortData } from "./components/Sort"; 
import "./App.css";

const App = () => {
  const { data, loading, error } = useFetchData(
    process.env.NODE_ENV === "production"
      ? "https://imsaurabh1.github.io/SpecificationData/data.json"
      : process.env.PUBLIC_URL + "/data.json"
  );     //loading data from the hook useFetchData
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // set state to page 1
  const [rowsPerPage, setRowsPerPage] = useState(10); // 10 rows to be displayed
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  useEffect(() => {
    if (data.length > 0) {
      setFilteredData(data);
    }
  }, [data]);

  //logic to handle sorting 
  const handleSort = (key, direction) => {
    const sortedData = sortData(filteredData, key, direction);
    setFilteredData(sortedData);
    setSortConfig({ key, direction });
  };

  //logic to reset sorting when RESET button is clicked
  const resetSorting = () => {
    setSortConfig({ key: null, direction: null });
    setFilteredData((prevFilteredData) => {
      return data.filter((item) =>
        prevFilteredData.some((filteredItem) => filteredItem.id === item.id)
      );
    });
};

  //handling loading and error state while data is being fetched
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  //main app layout
  return (
    <div className="app-container">
      <Header />
      <div className="main-content">
      <SidePanel
  data={data}
  setFilteredData={setFilteredData}
  sortConfig={sortConfig}
  sortData={sortData}
/>
        <div className="table-container">
          <SearchFilter
            data={data}
            setFilteredData={setFilteredData}
            resetSorting={resetSorting}
          />
          <Table
            data={filteredData}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            sortConfig={sortConfig}
            onSort={handleSort}
          />
          <Pagination
            totalRows={filteredData.length}
            rowsPerPage={rowsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onRowsPerPageChange={setRowsPerPage}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
