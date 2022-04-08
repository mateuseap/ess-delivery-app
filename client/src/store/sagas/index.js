import { all, takeLatest } from "@redux-saga/core/effects";

import { Types as UserTypes } from "../ducks/user";
import { Types as RestaurantsTypes } from "../ducks/restaurants";
import { Types as HistoryTypes } from "../ducks/history";

import getUser from "./user";
import getRestaurants from "./restaurants";
import { getHistory, postHistory } from "./history";

export default function* rootSaga() {
  return yield all([
    takeLatest(UserTypes.GET_USER, getUser),
    takeLatest(RestaurantsTypes.GET_RESTAURANTS, getRestaurants),
    takeLatest(HistoryTypes.GET_HISTORY, getHistory),
    takeLatest(HistoryTypes.POST_HISTORY, postHistory),
  ]);
}
