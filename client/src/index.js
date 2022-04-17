import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
=======
import store from "./store";
import { Provider } from "react-redux";
>>>>>>> fixDesenvolvimento

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
