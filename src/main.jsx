import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import Routing from "./Routing.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Sidebar>
          <Routing />
        </Sidebar>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
