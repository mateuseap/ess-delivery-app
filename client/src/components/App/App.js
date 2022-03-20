import React, { Component } from "react";
import { StyledApp } from "./App.style"
import { BrowserRouter} from "react-router-dom";
import RouteOptions from "../routes";

class App extends Component {
  render() {
    return (
      <StyledApp>
        <BrowserRouter>
          <RouteOptions/>
        </BrowserRouter>
      </StyledApp>
    );
  }
}

export default App;
