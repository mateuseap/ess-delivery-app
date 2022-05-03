import "@testing-library/jest-dom";

import Immutable from "seamless-immutable";

import Reducer, {
  Creators,
  Types,
  INITIAL_STATE,
} from "../../../store/ducks/restaurants";

describe("Restaurants Duck Test", () => {
  it("should set Initial State", () => {
    expect(INITIAL_STATE).toEqual({
      data: [],
      loading: false,
      error: false,
    });
  });

  it("should map action types", () => {
    expect(Types).toEqual({
      RESTAURANTS_REQUEST: "RESTAURANTS_REQUEST",
      GET_RESTAURANTS: "GET_RESTAURANTS",
      RESTAURANTS_SUCCESS: "RESTAURANTS_SUCCESS",
      RESTAURANTS_ERROR: "RESTAURANTS_ERROR",
    });
  });

  describe("Creators", () => {
    describe("RestaurantsRequest", () => {
      it("should return the action", () => {
        expect(Creators.restaurantsRequest()).toEqual({
          type: Types.RESTAURANTS_REQUEST,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.restaurantsRequest(1)).toEqual({
          type: Types.RESTAURANTS_REQUEST,
        });
      });
    });

    describe("GetRestaurants", () => {
      it("should return the action", () => {
        expect(Creators.getRestaurants(undefined)).toEqual({
          type: Types.GET_RESTAURANTS,
          query: undefined,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.getRestaurants(undefined, 1)).toEqual({
          type: Types.GET_RESTAURANTS,
          query: undefined,
        });
      });
    });

    describe("restaurantsSuccess", () => {
      it("should return the action", () => {
        expect(Creators.restaurantsSuccess({ id: "abc" })).toEqual({
          type: Types.RESTAURANTS_SUCCESS,
          data: { id: "abc" },
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.restaurantsSuccess({ id: "abc" }, 1)).toEqual({
          type: Types.RESTAURANTS_SUCCESS,
          data: { id: "abc" },
        });
      });
    });

    describe("restaurantsError", () => {
      it("should return the action", () => {
        expect(Creators.restaurantsError("error")).toEqual({
          type: Types.RESTAURANTS_ERROR,
          err: "error",
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.restaurantsError("error", 1)).toEqual({
          type: Types.RESTAURANTS_ERROR,
          err: "error",
        });
      });
    });
  });

  describe("Reducer", () => {
    it("should return initial state if passed nothing", () => {
      expect(Reducer()).toEqual(INITIAL_STATE);
    });

    it("should route RESTAURANTS_REQUEST to restaurantsRequest()", () => {
      expect(Reducer(INITIAL_STATE, Creators.restaurantsRequest())).toEqual({
        ...INITIAL_STATE,
        loading: true,
      });
    });

    it("should route RESTAURANTS_SUCCESS to restaurantsSuccess", () => {
      expect(
        Reducer(
          Immutable({
            error: true,
            loading: true,
            data: {},
          }),
          Creators.restaurantsSuccess({ foo: "dale" })
        )
      ).toEqual({
        error: false,
        loading: false,
        data: { foo: "dale" },
      });
    });

    it("should route RESTAURANTS_ERROR to restaurantsError", () => {
      expect(
        Reducer(
          Immutable({
            error: false,
            loading: true,
            data: {},
          }),
          Creators.restaurantsError("ERR")
        )
      ).toEqual({
        error: "ERR",
        loading: false,
        data: {},
      });
    });
  });
});
