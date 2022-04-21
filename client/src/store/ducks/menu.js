import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

export const { Types, Creators } = createActions({
  menuRequest: [],
  getMenu: ["id"],
  menuSuccess: ["data"],
  menuError: ["err"],
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
  [Types.MENU_ERROR]: error,
  [Types.MENU_REQUEST]: request,
  [Types.MENU_SUCCESS]: success,
});
