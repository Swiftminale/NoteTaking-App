import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client'
import "./index.css";
import App from "./App";

// Create the root element using the new API
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render your app inside <React.StrictMode>
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
