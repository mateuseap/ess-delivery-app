import { call, put } from "@redux-saga/core/effects";
import { Creators } from "../ducks/orderDetails";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

export default function* getOrderDetails({ id }) {
  try {
    yield put(Creators.orderDetailsRequest());

    let response = yield call(api.get, `/order-details?id=${ id }`);
    yield put(Creators.orderDetailsSuccess(response.data));
  } catch (err) {
    yield put(Creators.orderDetailsError({ err }));
    toastr.error("Erro ao buscar pedido");
  }
}
