import "@testing-library/jest-dom";

import Immutable from "seamless-immutable";

import Reducer, {
  Creators,
  Types,
  INITIAL_STATE,
} from "../../../store/ducks/menu";

describe("Menu Duck Test", () => {
  it("should set Initial State", () => {
    expect(INITIAL_STATE).toEqual({
      data: [],
      loading: false,
      error: false,
    });
  });

  it("should map action types", () => {
    expect(Types).toEqual({
      MENU_REQUEST: "MENU_REQUEST",
      GET_MENU: "GET_MENU",
      MENU_SUCCESS: "MENU_SUCCESS",
      MENU_ERROR: "MENU_ERROR",
    });
  });

  describe("Creators", () => {
    describe("MenuRequest", () => {
      it("should return the action", () => {
        expect(Creators.menuRequest()).toEqual({
          type: Types.MENU_REQUEST,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.menuRequest(1)).toEqual({
          type: Types.MENU_REQUEST,
        });
      });
    });

    describe("GetMenu", () => {
      it("should return the action", () => {
        expect(Creators.getMenu(1)).toEqual({
          type: Types.GET_MENU,
          id: 1,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.getMenu(1, 2)).toEqual({
          type: Types.GET_MENU,
          id: 1,
        });
      });
    });

    describe("menuSuccess", () => {
      it("should return the action", () => {
        expect(Creators.menuSuccess({ id: "abc" })).toEqual({
          type: Types.MENU_SUCCESS,
          data: { id: "abc" },
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.menuSuccess({ id: "abc" }, 1)).toEqual({
          type: Types.MENU_SUCCESS,
          data: { id: "abc" },
        });
      });
    });

    describe("menuError", () => {
      it("should return the action", () => {
        expect(Creators.menuError("error")).toEqual({
          type: Types.MENU_ERROR,
          err: "error",
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.menuError("error", 1)).toEqual({
          type: Types.MENU_ERROR,
          err: "error",
        });
      });
    });
  });

  describe("Reducer", () => {
    it("should return initial state if passed nothing", () => {
      expect(Reducer()).toEqual(INITIAL_STATE);
    });

    it("should route MENU_REQUEST to menuRequest()", () => {
      expect(Reducer(INITIAL_STATE, Creators.menuRequest())).toEqual({
        ...INITIAL_STATE,
        loading: true,
      });
    });

    it("should route MENU_SUCCESS to menuSuccess", () => {
      expect(
        Reducer(
          Immutable({
            error: true,
            loading: true,
            data: {},
          }),
          Creators.menuSuccess({ foo: "dale" })
        )
      ).toEqual({
        error: false,
        loading: false,
        data: { foo: "dale" },
      });
    });

    it("should route MENU_ERROR to menuError", () => {
      expect(
        Reducer(
          Immutable({
            error: false,
            loading: true,
            data: {},
          }),
          Creators.menuError("ERR")
        )
      ).toEqual({
        error: "ERR",
        loading: false,
        data: {},
      });
    });
  });
});
