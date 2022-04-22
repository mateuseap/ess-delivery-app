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

export function* updateCart({ rest_id, rest_name, item, amountToChange }) {
  try {
    yield put(Creators.cartRequest());

    let response = yield call(api.post, "/cart", {
      rest_id,
      rest_name,
      item,
      amountToChange,
    });
    
    if (response.data) {
      yield put(Creators.cartSuccess(response.data)); 
      toastr.success("Item adicionado ao carrinho.");
    }
  } catch (err) {
    yield put(Creators.cartError({ err }));
    toastr.error("Erro ao fazer pedido");
  }
}
