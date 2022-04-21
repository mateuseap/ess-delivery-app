import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/menu";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export default function* getMenu({ id }) {
  try {
    yield put(Creators.menuRequest());
    const response = yield call(api.get, `/restaurants?id=${id}`, { id });

    if (response.data) {
      yield put(Creators.menuSuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.menuError({ err }));
    toastr.error("Erro ao buscar menu");
  }
}
