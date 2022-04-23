import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/order";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export function* getOrderDetails({ id }) {
  try {
    yield put(Creators.orderRequest());

    let response = yield call(api.get, `/order-details?id=${id}`);
    yield put(Creators.orderSuccess(response.data));
  } catch (err) {
    yield put(Creators.orderError({ err }));
    toastr.error("Erro ao buscar pedido");
  }
}

export function* makeOrder({ callback }) {
  try {
    yield put(Creators.orderRequest());

    let response = yield call(api.post, "/make-order", {});
    if (response.data) {
      yield put(Creators.orderSuccess({}));
      toastr.success("Pedido feito com sucesso");
      if (callback) callback(response.data.id);
    }
  } catch (err) {
    yield put(Creators.orderError({ err }));
    toastr.error("Erro ao fazer pedido");
  }
}
