import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/restaurants";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export function* getRestaurants(query = false) {
  try {
    yield put(Creators.restaurantsRequest());

    const response = yield call(api.get, "/restaurants", { params: query });

    if (response.data) {
      yield put(Creators.restaurantsSuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.restaurantsError({ err }));
    toastr.error("Erro ao buscar restaurantes");
  }
}

export function* putRestaurants(changes) {
  try {
    yield put(Creators.restaurantsRequest());

    const response = yield call(api.put, "/restaurants", changes);

    console.log(response);
    if (response.data) {
      yield put(Creators.restaurantsSuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.restaurantsError({ err }));
    toastr.error("Erro ao buscar restaurantes");
  }
}
