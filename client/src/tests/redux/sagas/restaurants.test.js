import "@testing-library/jest-dom";
import { expect, jest } from "@jest/globals";
import getRestaurants from "../../../store/sagas/restaurants";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import Immutable from "seamless-immutable";
import { throwError } from "redux-saga-test-plan/providers";

import Reducer, {
  Creators,
  Types,
  INITIAL_STATE,
} from "../../../store/ducks/restaurants";

import api from "../../../services/api";

jest.mock("../../../services/api");

describe("Restaurants Saga Test", () => {
  const mockData = { data: "data" };
  const mockError = "error";
  describe("getRestaurants", () => {
    const query = undefined;
    it("unit test success", () => {
      testSaga(getRestaurants)
        .next()
        .put(Creators.restaurantsRequest())
        .next()
        .call(api.get, "/restaurants", {})
        .next(mockData)
        .put(Creators.restaurantsSuccess(mockData.data))
        .next()
        .isDone();
    });

    it("unit test error", () => {
      testSaga(getRestaurants)
        .next()
        .put(Creators.restaurantsRequest())
        .next()
        .call(api.get, "/restaurants", {})
        .throw(mockError)
        .put(Creators.restaurantsError({ err: mockError }))
        .next()
        .isDone();
    });

    it("integration test success", () => {
      return expectSaga(getRestaurants)
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
      return expectSaga(getRestaurants)
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
