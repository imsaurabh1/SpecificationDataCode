//Test file for App.js

import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App"; 
import useFetchData from "../hooks/useFetchData";  

jest.mock("../hooks/useFetchData");  

// Test 1: checking if loading message is shown
test("renders loading state initially", () => {
  useFetchData.mockReturnValue({ data: [], loading: true, error: null });
  render(<App />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

// Test 2: testing if it shows error message when there is a error
test("renders error message when there is an error", () => {
  useFetchData.mockReturnValue({ data: [], loading: false, error: "Failed to load data" });
  render(<App />);
  expect(screen.getByText(/Failed to load data/i)).toBeInTheDocument();
});
