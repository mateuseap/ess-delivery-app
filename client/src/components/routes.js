import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Home";
import Header from "./Header";
import TestReducer from "./TestReducer";
// provider para usar o redux (fazer o component ler o que tá sendo alterado)
import { Provider } from "react-redux";

import store from "../store";

class RouteOptions extends Component {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            exact
            path="/test_reducer"
            element={
              <Provider store={store}>
                <TestReducer />
              </Provider>
            }
          />
        </Routes>
      </>
    );
  }
}

export default RouteOptions;
