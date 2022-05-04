import "@testing-library/jest-dom";
import { expect, jest } from "@jest/globals";
import getMenu from "../../../store/sagas/menu";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import Immutable from "seamless-immutable";
import { throwError } from "redux-saga-test-plan/providers";

import Reducer, {
  Creators,
  Types,
  INITIAL_STATE,
} from "../../../store/ducks/menu";

import api from "../../../services/api";

jest.mock("../../../services/api");

describe("Menu Saga Test", () => {
  const mockData = { data: "data" };
  const mockError = "error";
  describe("getMenu", () => {
    const mockParams = { id: 1 };
    it("unit test success", () => {
      testSaga(getMenu, mockParams)
        .next()
        .put(Creators.menuRequest())
        .next()
        .call(api.get, `/restaurants?id=${mockParams.id}`, mockParams)
        .next(mockData)
        .put(Creators.menuSuccess(mockData.data))
        .next()
        .isDone();
    });

    it("unit test error", () => {
      testSaga(getMenu, mockParams)
        .next()
        .put(Creators.menuRequest())
        .next()
        .call(api.get, `/restaurants?id=${mockParams.id}`, mockParams)
        .throw(mockError)
        .put(Creators.menuError({ err: mockError }))
        .next()
        .isDone();
    });

    it("integration test success", () => {
      return expectSaga(getMenu, mockParams)
        .provide([[matchers.call.fn(api.get), mockData]])
        .withReducer(Reducer, INITIAL_STATE)
        .hasFinalState(
          Immutable({
            loading: false,
            error: false,
            data: mockData.data,
          })
        )
        .run();
    });

    it("integration test error", () => {
      return expectSaga(getMenu, mockParams)
        .provide([[matchers.call.fn(api.get), throwError(mockError)]])
        .withReducer(Reducer, INITIAL_STATE)
        .hasFinalState(
          Immutable({
            loading: false,
            error: { err: mockError },
            data: [],
          })
        )
        .run();
    });
  });
});
