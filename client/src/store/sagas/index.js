import { all, takeLatest } from "@redux-saga/core/effects";

import { Types as UserTypes } from "../ducks/user";

import getUser from "./user";

export default function* rootSaga() {
  return yield all([takeLatest(UserTypes.GET_USER, getUser)]);
}
