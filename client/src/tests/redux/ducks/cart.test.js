import "@testing-library/jest-dom";

import Immutable from "seamless-immutable";

import Reducer, {
  Creators,
  Types,
  INITIAL_STATE,
} from "../../../store/ducks/cart";

describe("Cart Duck Test", () => {
  it("should set Initial State", () => {
    expect(INITIAL_STATE).toEqual({
      data: [],
      loading: false,
      error: false,
    });
  });

  it("should map action types", () => {
    expect(Types).toEqual({
      CART_REQUEST: "CART_REQUEST",
      GET_CART: "GET_CART",
      UPDATE_CART: "UPDATE_CART",
      MAKE_ORDER: "MAKE_ORDER",
      CART_SUCCESS: "CART_SUCCESS",
      CART_ERROR: "CART_ERROR",
    });
  });

  describe("Creators", () => {
    describe("CartRequest", () => {
      it("should return the action", () => {
        expect(Creators.cartRequest()).toEqual({
          type: Types.CART_REQUEST,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.cartRequest(1)).toEqual({
          type: Types.CART_REQUEST,
        });
      });
    });

    describe("GetCart", () => {
      it("should return the action", () => {
        expect(Creators.getCart()).toEqual({
          type: Types.GET_CART,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.getCart(1)).toEqual({
          type: Types.GET_CART,
        });
      });
    });

    describe("UpdateCart", () => {
      it("should return the action", () => {
        expect(
          Creators.updateCart(1, "Almir", { name: "Feijao", price: 1 }, 1)
        ).toEqual({
          type: Types.UPDATE_CART,
          rest_id: 1,
          rest_name: "Almir",
          item: { name: "Feijao", price: 1 },
          amountToChange: 1,
        });
      });
      it("should ignore extra args", () => {
        expect(
          Creators.updateCart(1, "Almir", { name: "Feijao", price: 1 }, 1, 1)
        ).toEqual({
          type: Types.UPDATE_CART,
          rest_id: 1,
          rest_name: "Almir",
          item: { name: "Feijao", price: 1 },
          amountToChange: 1,
        });
      });
    });

    describe("makeOrder", () => {
      const mockCallback = jest.fn(() => {});
      it("should return the action", () => {
        expect(Creators.makeOrder(mockCallback)).toEqual({
          type: Types.MAKE_ORDER,
          callback: mockCallback,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.makeOrder(mockCallback, 1)).toEqual({
          type: Types.MAKE_ORDER,
          callback: mockCallback,
        });
      });
    });

    describe("cartSuccess", () => {
      it("should return the action", () => {
        expect(Creators.cartSuccess({ id: "abc" })).toEqual({
          type: Types.CART_SUCCESS,
          data: { id: "abc" },
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.cartSuccess({ id: "abc" }, 1)).toEqual({
          type: Types.CART_SUCCESS,
          data: { id: "abc" },
        });
      });
    });

    describe("cartError", () => {
      it("should return the action", () => {
        expect(Creators.cartError("error")).toEqual({
          type: Types.CART_ERROR,
          err: "error",
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.cartError("error", 1)).toEqual({
          type: Types.CART_ERROR,
          err: "error",
        });
      });
    });
  });

  describe("Reducer", () => {
    it("should return initial state if passed nothing", () => {
      expect(Reducer()).toEqual(INITIAL_STATE);
    });

    it("should route CART_REQUEST to cartRequest()", () => {
      expect(Reducer(INITIAL_STATE, Creators.cartRequest())).toEqual({
        ...INITIAL_STATE,
        loading: true,
      });
    });

    it("should route CART_SUCCESS to cartSuccess", () => {
      expect(
        Reducer(
          Immutable({
            error: true,
            loading: true,
            data: {},
          }),
          Creators.cartSuccess({ foo: "dale" })
        )
      ).toEqual({
        error: false,
        loading: false,
        data: { foo: "dale" },
      });
    });

    it("should route CART_ERROR to cartError", () => {
      expect(
        Reducer(
          Immutable({
            error: false,
            loading: true,
            data: {},
          }),
          Creators.cartError("ERR")
        )
      ).toEqual({
        error: "ERR",
        loading: false,
        data: {},
      });
    });
  });
});
