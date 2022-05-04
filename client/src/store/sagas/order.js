import { call, put, race, take, select, delay } from "@redux-saga/core/effects";
import { Creators, Types as OrderTypes } from "../ducks/order";
import api from "../../services/api";
import { toastr } from "react-redux-toastr";

const POLLING_DELAY = 2500;

export function* getOrderDetails({ id }) {
  try {
    yield put(Creators.orderRequest());

    let response = yield call(api.get, `/order-details?id=${id}`);
    yield put(Creators.orderSuccess(response.data));
  } catch (err) {
    yield put(Creators.orderError({ err }));
    yield put(Creators.cancelOrderWatch());
    toastr.error("Erro ao buscar pedido");
  }
}

export function* cancelOrder({ id, callback }) {
  try {
    yield put(Creators.orderRequest());

    let response = yield call(
      api.post,
      `/cancel-order`,
      { id },
      {
        validateStatus: function (status) {
          return status === 200 || status === 500;
        },
      }
    );
    if (response.status != 200) throw new Error(response.data.msg);

    const previousData = yield select((state) => state.order.data);
    yield put(Creators.orderSuccess(previousData));
    yield put(Creators.cancelOrderWatch());
    toastr.success("Pedido cancelado com sucesso", {
      timeOut: 0,
    });
    if (callback) callback();
  } catch (err) {
    yield put(Creators.orderError({ err }));
    toastr.error("Erro ao cancelar pedido", err.message, {
      timeOut: 0,
    });
  }
}

export function* orderStatusWorker({ id }) {
  try {
    while (true) {
      yield delay(POLLING_DELAY);

      let response = yield call(api.get, `/order-details?id=${id}`);

      let currentOrderDetails = yield select((state) => state.order.data);
      if (JSON.stringify(currentOrderDetails) !== JSON.stringify(response.data))
        toastr.success("Status do pedido atualizado");

      yield put(Creators.orderSuccess(response.data));

      if (response.data.status.finished) {
        yield put(Creators.cancelOrderWatch());
      }
    }
  } catch (err) {
    yield put(Creators.orderError({ err }));
    toastr.error("Erro ao atualizar pedido");
  }
}

export function* orderStatusWatchWorker({ id }) {
  yield race({
    get: call(orderStatusWorker, { id }),
    cancel: take(OrderTypes.CANCEL_ORDER_WATCH),
  });
}
