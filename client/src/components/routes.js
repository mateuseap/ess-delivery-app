import React, { Component } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "./Home";
import Header from "./Header";
import History from "./History";
import Cart from "./Cart";
import Menu from "./Menu";
import NotFound from "./NotFound";
import OrderDetails from "./OrderDetails";

class RouteOptions extends Component {
  render() {
    return (
      <>
        <Header />
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu/:id" element={<Menu />} />
          <Route path="/details/:id" element={<OrderDetails />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    );
  }
}

export default RouteOptions;
