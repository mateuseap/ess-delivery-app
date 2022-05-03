import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import History from "../../../components/History";
import { BrowserRouter } from "react-router-dom";
import { INITIAL_STATE, Types } from "../../../store/ducks/history";
import createSagaMiddleware from "redux-saga";
import { historyLoadedState } from "../dataUtils";

import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import toJson from "enzyme-to-json";

const sagaMiddleware = createSagaMiddleware();

const mockStore = configureStore([sagaMiddleware]);

Enzyme.configure({ adapter: new Adapter() });

describe("Home Component Integration Testing", () => {
  it("Renders loading correctly", () => {
    const store = mockStore({ history: INITIAL_STATE });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <History />
        </BrowserRouter>
      </Provider>
    );

    const expectedActions = [{ type: Types.GET_HISTORY, dateFilter: 30 }];
    expect(store.getActions()).toEqual(expectedActions);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("Renders data correctly", () => {
    const store = mockStore({
      history: historyLoadedState,
    });
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <History />
        </BrowserRouter>
      </Provider>
    );
    const expectedActions = [{ type: Types.GET_HISTORY, dateFilter: 30 }];
    expect(store.getActions()).toEqual(expectedActions);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
