import "@testing-library/jest-dom";

import * as React from "react";
import { render } from "@testing-library/react";

import App from "../components/App/App";
import store from "../store";
import { Provider } from "react-redux";

test("teste", () => {
  // tem que botar esse provider do redux se não da erro
  // ele não consegue enxergar o connect
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
});
