import "@testing-library/jest-dom";

import Immutable from "seamless-immutable";

import Reducer, {
  Creators,
  Types,
  INITIAL_STATE,
} from "../../../store/ducks/order";

describe("Order Duck Test", () => {
  it("should set Initial State", () => {
    expect(INITIAL_STATE).toEqual({
      data: [],
      loading: false,
      error: false,
    });
  });

  it("should map action types", () => {
    expect(Types).toEqual({
      ORDER_REQUEST: "ORDER_REQUEST",
      GET_ORDER_DETAILS: "GET_ORDER_DETAILS",
      ORDER_SUCCESS: "ORDER_SUCCESS",
      ORDER_ERROR: "ORDER_ERROR",
      CANCEL_ORDER: "CANCEL_ORDER",
      CANCEL_ORDER_WATCH: "CANCEL_ORDER_WATCH",
      ORDER_STATUS_WATCH_WORKER: "ORDER_STATUS_WATCH_WORKER",
    });
  });

  describe("Creators", () => {
    describe("OrderRequest", () => {
      it("should return the action", () => {
        expect(Creators.orderRequest()).toEqual({
          type: Types.ORDER_REQUEST,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.orderRequest(1)).toEqual({
          type: Types.ORDER_REQUEST,
        });
      });
    });

    describe("GetOrderDetails", () => {
      it("should return the action", () => {
        expect(Creators.getOrderDetails(1)).toEqual({
          type: Types.GET_ORDER_DETAILS,
          id: 1,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.getOrderDetails(1, 2)).toEqual({
          type: Types.GET_ORDER_DETAILS,
          id: 1,
        });
      });
    });

    describe("orderSuccess", () => {
      it("should return the action", () => {
        expect(Creators.orderSuccess({ id: "abc" })).toEqual({
          type: Types.ORDER_SUCCESS,
          data: { id: "abc" },
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.orderSuccess({ id: "abc" }, 1)).toEqual({
          type: Types.ORDER_SUCCESS,
          data: { id: "abc" },
        });
      });
    });

    describe("orderError", () => {
      it("should return the action", () => {
        expect(Creators.orderError("error")).toEqual({
          type: Types.ORDER_ERROR,
          err: "error",
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.orderError("error", 1)).toEqual({
          type: Types.ORDER_ERROR,
          err: "error",
        });
      });
    });

    describe("cancelOrder", () => {
      const mockCallback = jest.fn(() => {});
      it("should return the action", () => {
        expect(Creators.cancelOrder(1, mockCallback)).toEqual({
          type: Types.CANCEL_ORDER,
          id: 1,
          callback: mockCallback,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.cancelOrder(1, mockCallback, 1)).toEqual({
          type: Types.CANCEL_ORDER,
          id: 1,
          callback: mockCallback,
        });
      });
    });

    describe("cancelOrderWatch", () => {
      it("should return the action", () => {
        expect(Creators.cancelOrderWatch()).toEqual({
          type: Types.CANCEL_ORDER_WATCH,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.cancelOrderWatch(1)).toEqual({
          type: Types.CANCEL_ORDER_WATCH,
        });
      });
    });

    describe("orderStatusWatchWorker", () => {
      it("should return the action", () => {
        expect(Creators.orderStatusWatchWorker(1)).toEqual({
          type: Types.ORDER_STATUS_WATCH_WORKER,
          id: 1,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.orderStatusWatchWorker(1, 2)).toEqual({
          type: Types.ORDER_STATUS_WATCH_WORKER,
          id: 1,
        });
      });
    });
  });

  describe("Reducer", () => {
    it("should return initial state if passed nothing", () => {
      expect(Reducer()).toEqual(INITIAL_STATE);
    });

    it("should route ORDER_REQUEST to orderRequest()", () => {
      expect(Reducer(INITIAL_STATE, Creators.orderRequest())).toEqual({
        ...INITIAL_STATE,
        loading: true,
      });
    });

    it("should route ORDER_SUCCESS to orderSuccess", () => {
      expect(
        Reducer(
          Immutable({
            error: true,
            loading: true,
            data: {},
          }),
          Creators.orderSuccess({ foo: "dale" })
        )
      ).toEqual({
        error: false,
        loading: false,
        data: { foo: "dale" },
      });
    });

    it("should route ORDER_ERROR to orderError", () => {
      expect(
        Reducer(
          Immutable({
            error: false,
            loading: true,
            data: {},
          }),
          Creators.orderError("ERR")
        )
      ).toEqual({
        error: "ERR",
        loading: false,
        data: {},
      });
    });

    it("should route CANCEL_ORDER_WATCH to  cancelOrderWatch", () => {
      expect(Reducer(INITIAL_STATE, Creators.cancelOrderWatch())).toEqual({
        ...INITIAL_STATE,
      });
    });
  });
});
