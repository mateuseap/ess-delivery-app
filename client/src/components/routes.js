import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./Home";
import Header from "./Header";
import Mapa from "./Map";
import History from "./History";

class RouteOptions extends Component {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/map" element={<Mapa />} />
          <Route path="/history" element={<History />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
        </Routes>
      </>
    );
  }
}

export default RouteOptions;
