import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/user";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

import { AUTH_TOKEN } from "../../constants/constants";

export default function* getUser() {
  try {
    yield put(Creators.userRequest());
    let response = yield call(api.get, "/user", {
      headers: {
        Authorization: AUTH_TOKEN,
      },
    });

    if (response.data) {
      yield put(Creators.userSuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.userError({ err }));
    toastr.error("Erro ao buscar usuário");
  }
}
