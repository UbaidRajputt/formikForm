import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-dates/lib/css/_datepicker.css";
import "./index.css";
import App from "./App";
import Popup from "./components/NavigationErrorPopup";
import * as serviceWorker from "./serviceWorker";
import { HashRouter } from "react-router-dom";
ReactDOM.render(
  <HashRouter
    getUserConfirmation={(message, callback) => {
      ReactDOM.render(
        <Popup message={message} callback={callback} />,
        document.getElementById("modal")
      );
    }}
  >
    <App />
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
