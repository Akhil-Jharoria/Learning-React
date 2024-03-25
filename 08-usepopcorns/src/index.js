import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StartRating from "./StartRating";

const root = ReactDOM.createRoot(document.querySelector("#root"));

root.render(
  <React.StrictMode>
    {/* <StartRating maxRating={5} size={28} color="blue" />
    <StartRating maxRating={10} size={30} color="red" /> */}

    <App />
  </React.StrictMode>
);
