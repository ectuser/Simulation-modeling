import * as React from "react";
import * as ReactDOM from "react-dom";
import Header from "./components/Header/Header";
import "./styles/global.scss";

ReactDOM.render(
  <div>
    <Header name="header" count={0} />
  </div>,
  document.getElementById("app"),
);