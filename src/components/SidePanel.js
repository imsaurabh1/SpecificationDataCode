// Filter Component - Side Panel

import React, { useState, useEffect } from "react";

const SidePanel = ({
  data,
  setFilteredData,
  sortConfig, 
  sortData 
}) => {

  //state management
  const [openDrawer, setOpenDrawer] = useState(null);
  const [uniqueLabels, setUniqueLabels] = useState([]);
  const [uniqueCategories, setUniqueCategories] = useState([]);

  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [systemValueRange, setSystemValueRange] = useState([]);
  const [userValueRange, setUserValueRange] = useState([]);

  useEffect(() => {
    setUniqueLabels([...new Set(data.map((item) => item.label))]);  //getting unique labels
    setUniqueCategories([...new Set(data.map((item) => item.category))]); // getting unique categories
  }, [data]);

  // filter drawer toggle
  const toggleDrawer = (drawer) => {
    setOpenDrawer(openDrawer === drawer ? null : drawer);
  };

  // handling multi-select filter - via considering the old filter and addding new filter
  const handleMultiSelectChange = (value, setState) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // handling range filter
  const handleRangeChange = (value, setState) => {
    setState((prev) =>
      prev.includes(value) ? prev.filter((range) => range !== value) : [...prev, value]
    );
  };

  // applying filters and updating filtered data state
  const applyFilters = () => {
    let filtered = data;

    // Label filter
    if (selectedLabels.length > 0) {
      filtered = filtered.filter((item) => selectedLabels.includes(item.label));
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    // System Value filter
    if (systemValueRange.length > 0) {
      filtered = filtered.filter((item) => {
        const value = parseFloat(item.system_value);
        return systemValueRange.some((range) => {
          if (range === "0-50") return value >= 0 && value <= 50;
          if (range === "51-100") return value >= 51 && value <= 100;
          if (range === "More than 100") return value > 100;
          return false;
        });
      });
    }

    // User Value filter
    if (userValueRange.length > 0) {
      filtered = filtered.filter((item) => {
        const value = parseFloat(item.user_value);
        return userValueRange.some((range) => {
          if (range === "0-50") return value >= 0 && value <= 50;
          if (range === "51-100") return value >= 51 && value <= 100;
          if (range === "More than 100") return value > 100;
          return false;
        });
      });
    }

    if (sortConfig.key) {
      filtered = sortData(filtered, sortConfig.key, sortConfig.direction);
    }
    setFilteredData(filtered);
  };

  // applying filters whenever filter states change
  useEffect(() => {
    applyFilters();
  }, [selectedLabels, selectedCategories, systemValueRange, userValueRange]);

  const isFilterActive = (selectedValues) =>
    selectedValues && selectedValues.length > 0;

  return (
    <aside className="side-panel">
    
      <h3>Filter</h3>

      {/* Label Filter */}
      <div className="filter-group">
        <h4
          onClick={() => toggleDrawer("labels")}
          className={`filter-header ${
            openDrawer === "labels" || isFilterActive(selectedLabels) ? "active" : ""
          }`}
        >
          Label
        </h4>
        <div
          className={`filter-options ${
            openDrawer === "labels" ? "open-drawer" : "closed-drawer"
          }`}
        >
          {uniqueLabels.map((label) => (
            <label key={label} className="checkbox-container">
              <input
                type="checkbox"
                checked={selectedLabels.includes(label)}
                onChange={() => handleMultiSelectChange(label, setSelectedLabels)}
              />
              {label}
            </label>
          ))}
        </div>
      </div>
      <hr />

      {/* Category Filter */}
      <div className="filter-group">
        <h4
          onClick={() => toggleDrawer("categories")}
          className={`filter-header ${
            openDrawer === "categories" || isFilterActive(selectedCategories) ? "active" : ""
          }`}
        >
          Categories
        </h4>
        <div
          className={`filter-options ${
            openDrawer === "categories" ? "open-drawer" : "closed-drawer"
          }`}
        >
          {uniqueCategories.map((category) => (
            <label key={category} className="checkbox-container">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category)}
                onChange={() =>
                  handleMultiSelectChange(category, setSelectedCategories)
                }
              />
              {category}
            </label>
          ))}
        </div>
      </div>
      <hr />

      {/* System Value Filter */}
      <div className="filter-group">
        <h4
          onClick={() => toggleDrawer("systemValue")}
          className={`filter-header ${
            openDrawer === "systemValue" || isFilterActive(systemValueRange) ? "active" : ""
          }`}
        >
          System Value
        </h4>
        <div
          className={`filter-options ${
            openDrawer === "systemValue" ? "open-drawer" : "closed-drawer"
          }`}
        >
          {["0-50", "51-100", "More than 100"].map((range) => (
            <label key={range} className="checkbox-container">
              <input
                type="checkbox"
                checked={systemValueRange.includes(range)}
                onChange={() => handleRangeChange(range, setSystemValueRange)}
              />
              {range}
            </label>
          ))}
        </div>
      </div>
      <hr />

      {/* User Value Filter */}
      <div className="filter-group">
        <h4
          onClick={() => toggleDrawer("userValue")}
          className={`filter-header ${
            openDrawer === "userValue" || isFilterActive(userValueRange) ? "active" : ""
          }`}
        >
          User Value
        </h4>
        <div
          className={`filter-options ${
            openDrawer === "userValue" ? "open-drawer" : "closed-drawer"
          }`}
        >
          {["0-50", "51-100", "More than 100"].map((range) => (
            <label key={range} className="checkbox-container">
              <input
                type="checkbox"
                checked={userValueRange.includes(range)}
                onChange={() => handleRangeChange(range, setUserValueRange)}
              />
              {range}
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidePanel;
