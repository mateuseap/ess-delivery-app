import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/user";
import api from "../../services/api";

export default function* getUser(userToken) {
  try {
    yield put(Creators.userRequest());

    let response = yield call(api.get, "/test");

    if (response.data) {
      yield put(Creators.userSuccess(response.data));
    }
  } catch (err) {
    yield put(Creators.userError({ err }));
  }
}
