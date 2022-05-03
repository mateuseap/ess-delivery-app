import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Menu from "../../../components/Menu";
import { BrowserRouter } from "react-router-dom";
import { INITIAL_STATE, Types } from "../../../store/ducks/menu";
import createSagaMiddleware from "redux-saga";
import { menuLoadedState } from "../dataUtils";

import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";

const sagaMiddleware = createSagaMiddleware();

const mockStore = configureStore([sagaMiddleware]);

Enzyme.configure({ adapter: new Adapter() });

describe("Menu Component Integration Testing", () => {
  it("Renders loading correctly", () => {
    const store = mockStore({ menu: INITIAL_STATE });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Provider>
    );

    const expectedActions = [{ type: Types.GET_MENU }];
    expect(store.getActions()).toEqual(expectedActions);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("Renders data correctly", () => {
    const store = mockStore({
      menu: menuLoadedState,
    });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Menu />
        </BrowserRouter>
      </Provider>
    );
    const expectedActions = [{ type: Types.GET_MENU }];
    expect(store.getActions()).toEqual(expectedActions);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
