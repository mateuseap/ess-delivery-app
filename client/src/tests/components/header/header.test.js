import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Header from "../../../components/Header";
import { BrowserRouter } from "react-router-dom";
import {
  INITIAL_STATE as CART_INITIAL_STATE,
  Types as CartTypes,
} from "../../../store/ducks/cart";
import {
  INITIAL_STATE as USER_INITIAL_STATE,
  Types as UserTypes,
} from "../../../store/ducks/user";
import createSagaMiddleware from "redux-saga";

import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";
import { cartLoadedState, userLoadedState } from "../dataUtils";

const sagaMiddleware = createSagaMiddleware();

const mockStore = configureStore([sagaMiddleware]);

Enzyme.configure({ adapter: new Adapter() });

describe("Header Component Integration Testing", () => {
  it("Renders loading correctly", () => {
    const store = mockStore({
      cart: CART_INITIAL_STATE,
      user: USER_INITIAL_STATE,
    });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const expectedActions = [
      { type: UserTypes.GET_USER },
      { type: CartTypes.GET_CART },
    ];
    expect(store.getActions()).toEqual(expectedActions);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("Renders data correctly", () => {
    const store = mockStore({
      user: userLoadedState,
      cart: cartLoadedState,
    });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </Provider>
    );

    const expectedActions = [
      { type: UserTypes.GET_USER },
      { type: CartTypes.GET_CART },
    ];
    expect(store.getActions()).toEqual(expectedActions);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
