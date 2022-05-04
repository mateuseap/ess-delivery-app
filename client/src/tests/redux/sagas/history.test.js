import "@testing-library/jest-dom";
import { expect, jest } from "@jest/globals";
import { getHistory, postHistory } from "../../../store/sagas/history";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import Immutable from "seamless-immutable";
import { throwError } from "redux-saga-test-plan/providers";

import Reducer, { Creators, INITIAL_STATE } from "../../../store/ducks/history";

import api from "../../../services/api";

jest.mock("../../../services/api");

describe("History Saga Test", () => {
  const mockParamsGet = {
    dateFilter: 30,
  };
  const mockData = { data: "data" };
  const mockError = "error";
  describe("getHistory", () => {
    it("unit test success", () => {
      testSaga(getHistory, mockParamsGet)
        .next()
        .put(Creators.historyRequest())
        .next()
        .call(api.get, "/orders", { params: mockParamsGet })
        .next(mockData)
        .put(Creators.historySuccess(mockData.data))
        .next()
        .isDone();
    });

    it("unit test error", () => {
      testSaga(getHistory, mockParamsGet)
        .next()
        .put(Creators.historyRequest())
        .next()
        .call(api.get, "/orders", { params: mockParamsGet })
        .throw(mockError)
        .put(Creators.historyError({ err: mockError }))
        .next()
        .isDone();
    });

    it("integration test success", () => {
      return expectSaga(getHistory, mockParamsGet)
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
      return expectSaga(getHistory, mockParamsGet)
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

  describe("postHistory", () => {
    const mockParamsPost = {
      data: {
        restaurantId: 0,
        rate: {
          stars: 3.5,
          feedback_text: "testeeeeee",
        },
        orderId: "d8ef262c-c207-4f7f-a769-f12cf11e7847",
        daysFilter: 15,
      },
    };

    it("unit test success", () => {
      testSaga(postHistory, mockParamsPost)
        .next()
        .put(Creators.historyRequest())
        .next()
        .call(api.post, "/orders", { ...mockParamsPost.data })
        .next(mockData)
        .put(Creators.historySuccess(mockData.data))
        .next()
        .isDone();
    });

    it("unit test error", () => {
      testSaga(postHistory, mockParamsPost)
        .next()
        .put(Creators.historyRequest())
        .next()
        .call(api.post, "/orders", { ...mockParamsPost.data })
        .throw(mockError)
        .put(Creators.historyError({ err: mockError }))
        .next()
        .isDone();
    });

    it("integration test success", () => {
      return expectSaga(postHistory, mockParamsPost)
        .provide([[matchers.call.fn(api.post), mockData]])
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
      return expectSaga(postHistory, mockParamsPost)
        .provide([[matchers.call.fn(api.post), throwError(mockError)]])
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
