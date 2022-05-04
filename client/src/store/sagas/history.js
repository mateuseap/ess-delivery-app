import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/history";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export function* getHistory({ dateFilter }) {
  try {
    yield put(Creators.historyRequest());

    const response = yield call(api.get, "/orders", { params: { dateFilter } });

    if (response.data) {
      yield put(Creators.historySuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.historyError({ err }));
    toastr.error("Erro ao pegar histórico dos pedidos");
  }
}

export function* postHistory({ data }) {
  try {
    yield put(Creators.historyRequest());

    const response = yield call(api.post, "/orders", { ...data });

    if (response.data) {
      yield put(Creators.historySuccess(response.data));
      toastr.success("Avaliação enviada com sucesso.");
    }
  } catch (err) {
    yield put(Creators.historyError({ err }));
    toastr.error("Erro ao enviar avaliação.");
  }
}
