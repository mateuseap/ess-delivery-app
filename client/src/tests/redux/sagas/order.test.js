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
} from "../../../store/ducks/order";

import api from "../../../services/api";
import { getOrderDetails, cancelOrder } from "../../../store/sagas/order";

jest.mock("../../../services/api");

describe("Order Saga Test", () => {
  const mockData = { data: "data" };
  const mockError = "error";
  describe("getOrderDetails", () => {
    const mockParams = { id: 1 };
    it("unit test success", () => {
      testSaga(getOrderDetails, mockParams)
        .next()
        .put(Creators.orderRequest())
        .next()
        .call(api.get, `/order-details?id=${mockParams.id}`)
        .next(mockData)
        .put(Creators.orderSuccess(mockData.data))
        .next()
        .isDone();
    });

    it("unit test error", () => {
      testSaga(getOrderDetails, mockParams)
        .next()
        .put(Creators.orderRequest())
        .next()
        .call(api.get, `/order-details?id=${mockParams.id}`)
        .throw(mockError)
        .put(Creators.orderError({ err: mockError }))
        .next()
        .put(Creators.cancelOrderWatch())
        .next()
        .isDone();
    });

    it("integration test success", () => {
      return expectSaga(getOrderDetails, mockParams)
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
      return expectSaga(getOrderDetails, mockParams)
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
