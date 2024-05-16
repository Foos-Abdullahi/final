import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Login from "./Authentication/Login";
import DLogin from "./Authentication/dLogin";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    {/* <Login/> */}
    <DLogin/>
    </BrowserRouter>
  </React.StrictMode>
);
