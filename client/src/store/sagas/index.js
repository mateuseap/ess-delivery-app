import { all, takeLatest } from "@redux-saga/core/effects";

import { Types as UserTypes } from "../ducks/user";
import { Types as RestaurantsTypes } from "../ducks/restaurants";
import { Types as MapTypes } from "../ducks/mapInfo";

import getUser from "./user";
import getRestaurants from "./restaurants";
import getMapInfo from "./mapInfo";

export default function* rootSaga() {
  return yield all([
    takeLatest(UserTypes.GET_USER, getUser),
    takeLatest(RestaurantsTypes.GET_RESTAURANTS, getRestaurants),
    takeLatest(MapTypes.GET_MAP_INFO, getMapInfo),
  ]);
}
