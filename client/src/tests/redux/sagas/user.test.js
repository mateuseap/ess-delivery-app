import "@testing-library/jest-dom";
import { expect, jest } from "@jest/globals";
import getUser from "../../../store/sagas/user";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import Immutable from "seamless-immutable";
import { throwError } from "redux-saga-test-plan/providers";

import Reducer, {
  Creators,
  Types,
  INITIAL_STATE,
} from "../../../store/ducks/user";

import api from "../../../services/api";

jest.mock("../../../services/api");

describe("User Saga Test", () => {
  const mockData = { data: "data" };
  const mockError = "error";
  describe("getUser", () => {
    it("unit test success", () => {
      testSaga(getUser)
        .next()
        .put(Creators.userRequest())
        .next()
        .call(api.get, "/user")
        .next(mockData)
        .put(Creators.userSuccess(mockData.data))
        .next()
        .isDone();
    });

    it("unit test error", () => {
      testSaga(getUser)
        .next()
        .put(Creators.userRequest())
        .next()
        .call(api.get, "/user")
        .throw(mockError)
        .put(Creators.userError({ err: mockError }))
        .next()
        .isDone();
    });

    it("integration test success", () => {
      return expectSaga(getUser)
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
      return expectSaga(getUser)
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
