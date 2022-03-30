import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/user";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export default function* getUser(userToken) {
  try {
    yield put(Creators.userRequest());

    let response = yield call(api.get, "/user");

    if (response.data) {
      // como so iremos trabalhar com um usuario:
      yield put(Creators.userSuccess(response.data[0]));
    }
  } catch (err) {
    yield put(Creators.userError({ err }));
    toastr.error("Erro ao buscar usuário");
  }
}
