import "@testing-library/jest-dom";

import Immutable from "seamless-immutable";

import Reducer, {
  Creators,
  Types,
  INITIAL_STATE,
} from "../../../store/ducks/history";

describe("History Duck Test", () => {
  it("should set Initial State", () => {
    expect(INITIAL_STATE).toEqual({
      data: [],
      loading: false,
      error: false,
    });
  });

  it("should map action types", () => {
    expect(Types).toEqual({
      HISTORY_REQUEST: "HISTORY_REQUEST",
      GET_HISTORY: "GET_HISTORY",
      POST_HISTORY: "POST_HISTORY",
      HISTORY_SUCCESS: "HISTORY_SUCCESS",
      HISTORY_ERROR: "HISTORY_ERROR",
    });
  });

  describe("Creators", () => {
    describe("HistoryRequest", () => {
      it("should return the action", () => {
        expect(Creators.historyRequest()).toEqual({
          type: Types.HISTORY_REQUEST,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.historyRequest(1)).toEqual({
          type: Types.HISTORY_REQUEST,
        });
      });
    });

    describe("GetHistory", () => {
      it("should return the action", () => {
        expect(Creators.getHistory(30)).toEqual({
          dateFilter: 30,
          type: Types.GET_HISTORY,
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.getHistory(30, 1)).toEqual({
          dateFilter: 30,
          type: Types.GET_HISTORY,
        });
      });
    });

    describe("PostHistory", () => {
      it("should return the action", () => {
        expect(
          Creators.postHistory({
            restaurantId: 0,
            rate: {
              stars: 3.5,
              feedback_text: "Testeeeee",
            },
            orderId: "d8ef262c-c207-4f7f-a769-f12cf11e7847",
            daysFilter: 7,
          })
        ).toEqual({
          data: {
            daysFilter: 7,
            orderId: "d8ef262c-c207-4f7f-a769-f12cf11e7847",
            rate: {
              feedback_text: "Testeeeee",
              stars: 3.5,
            },
            restaurantId: 0,
          },
          type: Types.POST_HISTORY,
        });
      });
      it("should ignore extra args", () => {
        expect(
          Creators.postHistory(
            {
              restaurantId: 0,
              rate: {
                stars: 3.5,
                feedback_text: "Testeeeee",
              },
              orderId: "d8ef262c-c207-4f7f-a769-f12cf11e7847",
              daysFilter: 7,
            },
            1
          )
        ).toEqual({
          data: {
            daysFilter: 7,
            orderId: "d8ef262c-c207-4f7f-a769-f12cf11e7847",
            rate: {
              feedback_text: "Testeeeee",
              stars: 3.5,
            },
            restaurantId: 0,
          },
          type: Types.POST_HISTORY,
        });
      });
    });

    describe("historySuccess", () => {
      it("should return the action", () => {
        expect(Creators.historySuccess({ id: "abc" })).toEqual({
          type: Types.HISTORY_SUCCESS,
          data: { id: "abc" },
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.historySuccess({ id: "abc" }, 1)).toEqual({
          type: Types.HISTORY_SUCCESS,
          data: { id: "abc" },
        });
      });
    });

    describe("historyError", () => {
      it("should return the action", () => {
        expect(Creators.historyError("error")).toEqual({
          type: Types.HISTORY_ERROR,
          err: "error",
        });
      });
      it("should ignore extra args", () => {
        expect(Creators.historyError("error", 1)).toEqual({
          type: Types.HISTORY_ERROR,
          err: "error",
        });
      });
    });
  });

  describe("Reducer", () => {
    it("should return initial state if passed nothing", () => {
      expect(Reducer()).toEqual(INITIAL_STATE);
    });

    it("should route HISTORY_REQUEST to historyRequest()", () => {
      expect(Reducer(INITIAL_STATE, Creators.historyRequest())).toEqual({
        ...INITIAL_STATE,
        loading: true,
      });
    });

    it("should route HISTORY_SUCCESS to historySuccess", () => {
      expect(
        Reducer(
          Immutable({
            error: true,
            loading: true,
            data: {},
          }),
          Creators.historySuccess({ foo: "dale" })
        )
      ).toEqual({
        error: false,
        loading: false,
        data: { foo: "dale" },
      });
    });

    it("should route HISTORY_ERROR to historyError", () => {
      expect(
        Reducer(
          Immutable({
            error: false,
            loading: true,
            data: {},
          }),
          Creators.historyError("ERR")
        )
      ).toEqual({
        error: "ERR",
        loading: false,
        data: {},
      });
    });
  });
});
