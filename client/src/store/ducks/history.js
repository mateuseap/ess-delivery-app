import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

export const { Types, Creators } = createActions({
  historyRequest: [],
  getHistory: ["dateFilter"],
  postHistory: ["data"],
  historySuccess: ["data"],
  historyError: ["err"],
});

export const INITIAL_STATE = Immutable({
  data: [],
  loading: false,
  error: false,
});

const request = (state) => state.merge({ loading: true });

const error = (state, { err }) => state.merge({ loading: false, error: err });

const success = (state, { data }) =>
  state.merge({ data, loading: false, error: false });

export default createReducer(INITIAL_STATE, {
  [Types.HISTORY_ERROR]: error,
  [Types.HISTORY_REQUEST]: request,
  [Types.HISTORY_SUCCESS]: success,
});
