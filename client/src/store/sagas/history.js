import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/history";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export function* getHistory() {
  try {
    yield put(Creators.historyRequest());

    const response = yield call(api.get, "/orders");

    if (response.data) {
      yield put(Creators.historySuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.historyError({ err }));
    toastr.error("Erro ao pegar histórico dos pedidos");
  }
}

export function* postHistory({ data, changes }) {
  try {
    yield put(Creators.historyRequest());

    const response = yield call(api.post, "/orders", { data, changes });

    if (response.data) {
      yield put(Creators.historySuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.historyError({ err }));
    toastr.error("Erro ao atualizar histórico de pedidos");
  }
}
