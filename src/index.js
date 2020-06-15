import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import BusyIndicator from './components/BusyIndicator';

import App from "./App";

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Suspense fallback={<BusyIndicator />}>
    <App />
  </Suspense>,
  rootElement
);