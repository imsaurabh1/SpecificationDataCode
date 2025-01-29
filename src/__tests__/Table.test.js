//Test file for Table.js component

import React from "react";
import { render, screen } from "@testing-library/react";
import Table from "../components/Table";  

// adding mock data
const mockData = [
  { id: 1, label: "Test 1", category: "Category 1" },
  { id: 2, label: "Test 2", category: "Category 2" }
];

// Test 1 : checking if table is displayed or not with data
test("renders table with data", () => {
  render(<Table data={mockData} currentPage={1} rowsPerPage={10} onSort={jest.fn()} sortConfig={{}} />);
  expect(screen.getByText("Test 1")).toBeInTheDocument();
  expect(screen.getByText("Test 2")).toBeInTheDocument();
});
