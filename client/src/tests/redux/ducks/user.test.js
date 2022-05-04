import "@testing-library/jest-dom";

import Immutable from "seamless-immutable";

import Reducer, {
  Creators,
  Types,
  INITIAL_STATE,
} from "../../../store/ducks/user";

describe("User Duck Test", () => {
  it("should set Initial State", () => {
    expect(INITIAL_STATE).toEqual({
      data: [],
      loading: false,
      error: false,
    });
  });

  it("should map action types", () => {
    expect(Types).toEqual({
      USER_REQUEST: "USER_REQUEST",
      GET_USER: "GET_USER",
      USER_SUCCESS: "USER_SUCCESS",
      USER_ERROR: "USER_ERROR",
    });
  });

  describe("Creators", () => {
    describe("UserRequest", () => {
      it("should return the action", () => {
        expect(Creators.userRequest()).toEqual({
          type: Types.USER_REQUEST,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.userRequest(1)).toEqual({
          type: Types.USER_REQUEST,
        });
      });
    });

    describe("GetUser", () => {
      it("should return the action", () => {
        expect(Creators.getUser()).toEqual({
          type: Types.GET_USER,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.getUser(1)).toEqual({
          type: Types.GET_USER,
        });
      });
    });

    describe("userSuccess", () => {
      it("should return the action", () => {
        expect(Creators.userSuccess({ id: "abc" })).toEqual({
          type: Types.USER_SUCCESS,
          data: { id: "abc" },
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.userSuccess({ id: "abc" }, 1)).toEqual({
          type: Types.USER_SUCCESS,
          data: { id: "abc" },
        });
      });
    });

    describe("userError", () => {
      it("should return the action", () => {
        expect(Creators.userError("error")).toEqual({
          type: Types.USER_ERROR,
          err: "error",
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.userError("error", 1)).toEqual({
          type: Types.USER_ERROR,
          err: "error",
        });
      });
    });
  });

  describe("Reducer", () => {
    it("should return initial state if passed nothing", () => {
      expect(Reducer()).toEqual(INITIAL_STATE);
    });

    it("should route USER_REQUEST to userRequest()", () => {
      expect(Reducer(INITIAL_STATE, Creators.userRequest())).toEqual({
        ...INITIAL_STATE,
        loading: true,
      });
    });

    it("should route USER_SUCCESS to userSuccess", () => {
      expect(
        Reducer(
          Immutable({
            error: true,
            loading: true,
            data: {},
          }),
          Creators.userSuccess({ foo: "dale" })
        )
      ).toEqual({
        error: false,
        loading: false,
        data: { foo: "dale" },
      });
    });

    it("should route USER_ERROR to userError", () => {
      expect(
        Reducer(
          Immutable({
            error: false,
            loading: true,
            data: {},
          }),
          Creators.userError("ERR")
        )
      ).toEqual({
        error: "ERR",
        loading: false,
        data: {},
      });
    });
  });
});
