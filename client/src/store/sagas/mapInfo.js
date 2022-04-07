import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/mapInfo";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export default function* getMapInfo(orderId) {
  try {
    yield put(Creators.mapInfoRequest());

    let response = yield call(api.get, "/mapRoute", {
      params: {
        param: orderId,
      },
    });

    if (response.data) {
      yield put(Creators.mapInfoSuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.mapInfoError({ err }));
    toastr.error("Erro ao criar mapa");
  }
}
