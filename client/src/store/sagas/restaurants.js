import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/restaurants";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export function* getRestaurants({ displayAll }) {
  try {
    yield put(Creators.restaurantsRequest());
    const response = yield call(api.get, "/restaurants", {
      displayAll,
    });

    if (response.data && response.data.length) {
      yield put(Creators.restaurantsSuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.restaurantsError({ err }));
    toastr.error("Erro ao buscar restaurantes");
  }
}

export function* putRestaurants({ changes }) {
  try {
    yield put(Creators.restaurantsRequest());

    const response = yield call(api.put, "/restaurants", { changes });

    if (response.data && response.data.length) {
      yield put(Creators.restaurantsSuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.restaurantsError({ err }));
    toastr.error("Erro ao atualizar o banco de restaurantes");
  }
}
