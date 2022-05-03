import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Home from "../../../components/Home";
import { BrowserRouter } from "react-router-dom";
import { INITIAL_STATE, Types } from "../../../store/ducks/restaurants";
import createSagaMiddleware from "redux-saga";
import { restaurantsLoadedState } from "../dataUtils";

import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";

const sagaMiddleware = createSagaMiddleware();

const mockStore = configureStore([sagaMiddleware]);

Enzyme.configure({ adapter: new Adapter() });

describe("Home Component Integration Testing", () => {
  it("Renders loading correctly", () => {
    const store = mockStore({ restaurants: INITIAL_STATE });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );

    const expectedActions = [{ type: Types.GET_RESTAURANTS }];
    expect(store.getActions()).toEqual(expectedActions);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("Renders data correctly", () => {
    const store = mockStore({
      restaurants: restaurantsLoadedState,
    });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>
    );
    const expectedActions = [{ type: Types.GET_RESTAURANTS }];
    expect(store.getActions()).toEqual(expectedActions);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
