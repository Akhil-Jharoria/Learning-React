import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QuizeContextProvider } from "../src/Context/QuizeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <QuizeContextProvider>
      <App />
    </QuizeContextProvider>
  </React.StrictMode>
);
