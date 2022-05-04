import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Cart from "../../../components/Cart";
import { BrowserRouter } from "react-router-dom";
import { INITIAL_STATE, Types } from "../../../store/ducks/cart";
import createSagaMiddleware from "redux-saga";
import { cartLoadedState } from "../dataUtils";

import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";

const sagaMiddleware = createSagaMiddleware();

const mockStore = configureStore([sagaMiddleware]);

Enzyme.configure({ adapter: new Adapter() });

describe("Cart Component Integration Testing", () => {
  it("Renders loading correctly", () => {
    const store = mockStore({ cart: INITIAL_STATE });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );

    const expectedActions = [{ type: Types.GET_CART }];
    expect(store.getActions()).toEqual(expectedActions);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("Renders data correctly", () => {
    const store = mockStore({
      cart: cartLoadedState,
    });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Cart />
        </BrowserRouter>
      </Provider>
    );
    const expectedActions = [{ type: Types.GET_CART }];
    expect(store.getActions()).toEqual(expectedActions);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
