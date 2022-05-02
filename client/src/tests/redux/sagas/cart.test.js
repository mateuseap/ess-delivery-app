import "@testing-library/jest-dom";
import { expect, jest } from "@jest/globals";
import { makeOrder, updateCart, getCart } from "../../../store/sagas/cart";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import Immutable from "seamless-immutable";
import { throwError } from "redux-saga-test-plan/providers";

import Reducer, {
  Creators,
  Types,
  INITIAL_STATE,
} from "../../../store/ducks/cart";

import api from "../../../services/api";

jest.mock("../../../services/api");

describe("Cart Saga Test", () => {
  const mockData = { data: "data" };
  const mockError = "error";
  describe("getCart", () => {
    it("unit test success", () => {
      testSaga(getCart)
        .next()
        .put(Creators.cartRequest())
        .next()
        .call(api.get, "/cart", {})
        .next(mockData)
        .put(Creators.cartSuccess(mockData.data))
        .next()
        .isDone();
    });

    it("unit test error", () => {
      testSaga(getCart)
        .next()
        .put(Creators.cartRequest())
        .next()
        .call(api.get, "/cart", {})
        .throw(mockError)
        .put(Creators.cartError({ err: mockError }))
        .next()
        .isDone();
    });

    it("integration test success", () => {
      return expectSaga(getCart)
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
      return expectSaga(getCart)
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

  describe("updateCart", () => {
    const mockParams = {
      rest_id: 1,
      rest_name: "Almir",
      item: { price: 1, name: "bife" },
      amountToChange: 1,
    };

    it("unit test success", () => {
      testSaga(updateCart, mockParams)
        .next()
        .put(Creators.cartRequest())
        .next()
        .call(api.post, "/cart", mockParams)
        .next(mockData)
        .put(Creators.cartSuccess(mockData.data))
        .next()
        .isDone();
    });

    it("unit test error", () => {
      testSaga(updateCart, mockParams)
        .next()
        .put(Creators.cartRequest())
        .next()
        .call(api.post, "/cart", mockParams)
        .throw(mockError)
        .put(Creators.cartError({ err: mockError }))
        .next()
        .isDone();
    });

    it("integration test success", () => {
      return expectSaga(updateCart, mockParams)
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
      return expectSaga(updateCart, mockParams)
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

  describe("makeOrder", () => {
    const mockData = { data: { id: 1 } };
    const callback = jest.fn();
    it("unit test success", () => {
      testSaga(makeOrder, { callback })
        .next()
        .put(Creators.cartRequest())
        .next()
        .call(api.post, "/make-order", {})
        .next(mockData)
        .put(Creators.cartSuccess({}))
        .next()
        .isDone();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).lastCalledWith(mockData.data.id);
    });

    it("unit test success", () => {
      testSaga(makeOrder, { callback })
        .next()
        .put(Creators.cartRequest())
        .next()
        .call(api.post, "/make-order", {})
        .throw(mockError)
        .put(Creators.cartError({ err: mockError }))
        .next()
        .isDone();

      expect(callback).toHaveBeenCalledTimes(0);
    });

    it("integration test success", () => {
      return expectSaga(makeOrder, { callback })
        .provide([[matchers.call.fn(api.post), mockData]])
        .withReducer(Reducer, INITIAL_STATE)
        .hasFinalState(
          Immutable({
            loading: false,
            error: false,
            data: {},
          })
        )
        .run();
    });

    it("integration test error", () => {
      return expectSaga(makeOrder, { callback })
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
