import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

export const { Types, Creators } = createActions({
  cartRequest: [],
  getCart: [],
  updateCart: ["cart"],
  cartSuccess: ["data"],
  cartError: ["err"],
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
  [Types.CART_ERROR]: error,
  [Types.CART_REQUEST]: request,
  [Types.CART_SUCCESS]: success,
});
