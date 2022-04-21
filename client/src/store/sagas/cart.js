import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/cart";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export function* getCart() {
  try {
    yield put(Creators.cartRequest());

    let response = yield call(api.get, "/cart", {});
    yield put(Creators.cartSuccess(response.data));
  } catch (err) {
    yield put(Creators.cartError({ err }));
    toastr.error("Erro ao buscar carrinho");
  }
}

export function* updateCart({ cart }) {
  try {
    yield put(Creators.cartRequest());

    let response = yield call(api.post, "/cart", { cart });
    if (response.data) {
      // como so iremos trabalhar com um usuario:
      yield put(Creators.cartSuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.cartError({ err }));
    toastr.error("Erro ao fazer pedido");
  }
}
