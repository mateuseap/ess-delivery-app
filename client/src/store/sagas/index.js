import { all, takeLatest } from "@redux-saga/core/effects";

import { Types as UserTypes } from "../ducks/user";
import { Types as RestaurantsTypes } from "../ducks/restaurants";
import { Types as HistoryTypes } from "../ducks/history";
import { Types as CartTypes } from "../ducks/cart";
import { Types as MenuTypes } from "../ducks/menu";
import { Types as OrderDetailsTypes } from "../ducks/orderDetails";

import getUser from "./user";
import getRestaurants from "./restaurants";
import { getHistory, postHistory } from "./history";
import { getCart, updateCart } from "./cart";
import getMenu from "./menu";
import getOrderDetails from "./orderDetails";

export default function* rootSaga() {
  return yield all([
    takeLatest(UserTypes.GET_USER, getUser),
    takeLatest(RestaurantsTypes.GET_RESTAURANTS, getRestaurants),
    takeLatest(HistoryTypes.GET_HISTORY, getHistory),
    takeLatest(HistoryTypes.POST_HISTORY, postHistory),
    takeLatest(CartTypes.GET_CART, getCart),
    takeLatest(CartTypes.UPDATE_CART, updateCart),
    takeLatest(MenuTypes.GET_MENU, getMenu),
    takeLatest(OrderDetailsTypes.GET_ORDER_DETAILS, getOrderDetails)
  ]);
}
