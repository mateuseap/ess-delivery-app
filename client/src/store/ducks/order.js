import { createReducer, createActions } from "reduxsauce";
import Immutable from "seamless-immutable";

export const { Types, Creators } = createActions({
  orderRequest: [],
  getOrderDetails: ["id"],
  orderSuccess: ["data"],
  orderError: ["err"],
  cancelOrder: ["id"],
  cancelOrderWatch: [],
  orderStatusWatchWorker: ["id"],
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

const cancelOrderWatch = (state) => state.merge({});

export default createReducer(INITIAL_STATE, {
  [Types.ORDER_ERROR]: error,
  [Types.ORDER_REQUEST]: request,
  [Types.ORDER_SUCCESS]: success,
  [Types.CANCEL_ORDER_WATCH]: cancelOrderWatch,
});
