import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/cart";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

import { AUTH_TOKEN } from "../../constants/constants";

export default function* getCart() {
  try {
    yield put(Creators.cartRequest());

    let response = yield call(api.get, "/cart", {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });
    if (response.data) {
      // como so iremos trabalhar com um usuario:
      yield put(Creators.cartSuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.cartError({ err }));
    toastr.error("Erro ao buscar usuário");
  }
}
