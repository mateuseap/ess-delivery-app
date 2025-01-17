import React, { Component } from "react";
import { StyledApp } from "./App.style";
import { BrowserRouter } from "react-router-dom";
import RouteOptions from "../routes";
import ReduxToastr from "react-redux-toastr";

import "react-redux-toastr/lib/css/react-redux-toastr.min.css";

class App extends Component {
  render() {
    return (
      <StyledApp>
        <BrowserRouter>
          <RouteOptions />
        </BrowserRouter>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          getState={(state) => state.toastr} // This is the default
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
      </StyledApp>
    );
  }
}

export default App;
