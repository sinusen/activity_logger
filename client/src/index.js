import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { CookiesProvider } from "react-cookie";
import RouteHandler from "./components/RouteHandler";

import "./styles.css";

ReactDOM.render(
  <CookiesProvider>
    <div className="container">
      <h1 className="text-center main-title">Activity Logger</h1>
      <RouteHandler>
        <App />
      </RouteHandler>
    </div>
  </CookiesProvider>,
  document.querySelector("#root")
);
