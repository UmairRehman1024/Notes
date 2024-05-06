import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import Component from "./components/V0";


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    {/* <Component/> */}
  </React.StrictMode>,
);
