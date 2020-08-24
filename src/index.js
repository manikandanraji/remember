import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import "./styles/index.css";

const RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

render(<RootApp />, document.getElementById("root"));
