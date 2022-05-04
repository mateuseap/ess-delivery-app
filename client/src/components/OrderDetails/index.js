import React, { Component } from "react";
import { connect } from "react-redux";
import { Creators as OrderCreators } from "../../store/ducks/order";
import ReactLoading from "react-loading";
import { Button } from "react-bootstrap";

import { formatMoney } from "../../utils/misc";
import { withRouter } from "../../utils/misc";

import {
  OrderDetailsPage,
  OrderTitles,
  OrderStatus,
  OrderStatusItem,
  Restaurant,
  RestaurantName,
  OrderItem,
  OrderItemPrice,
  Total,
  TotalPrice,
  Deliver,
  LateDeliver,
  ButtonRight,
} from "./styles";

import NotFound from "../NotFound";

class OrderDetails extends Component {
  componentDidMount() {
    const { id } = this.props.router.params;
    this.props.getOrderDetails(id);
    this.props.orderStatusWatchWorker(id);
  }

  formatOrder(quantity, name) {
    return quantity < 10 ? `0${quantity} - ${name}` : `${quantity} - ${name}`;
  }

  handleCancelOrder() {
    const { id } = this.props.router.params;
    const callback = () => {
      this.props.router.navigate(`/home`);
    };
    this.props.cancelOrder(id, callback);
  }

  deliveryTime() {
    const order = this.props.order.data;
    const orderTimestamp = order.timestamp;
    const deliveryTime = 60 * 60 * 1000; //1 hour
    return new Date(orderTimestamp + deliveryTime).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  lateCheck() {
    const order = this.props.order.data;
    const orderTimestamp = order.timestamp;
    const deliveryTime = 90 * 60 * 1000; //1.5 hour
    return new Date() > new Date(orderTimestamp + deliveryTime);
  }

  render() {
    const orderDetails = this.props.order;
    const order = orderDetails.data;
    this.deliveryTime();
    if (
      orderDetails.error &&
      orderDetails.error.err.message !==
        "O pedido só pode ser cancelado se seu preparo não tiver sido iniciado ou se houver um atraso de 30 minutos ou mais"
    ) {
      console.log(orderDetails.error.err);
      return <NotFound />;
    }
    return (
      <>
        {orderDetails.loading || !order ? (
          <ReactLoading type={"spin"} />
        ) : (
          <OrderDetailsPage>
            <OrderTitles>Status do Pedido</OrderTitles>

            <OrderStatus>
              {order.status?.confirmed ? (
                <OrderStatusItem name="CONFIRMADO">Confirmado</OrderStatusItem>
              ) : (
                ""
              )}

              {order.status?.preparing ? (
                <OrderStatusItem name="preparing">Em preparo</OrderStatusItem>
              ) : (
                ""
              )}

              {order.status?.delivering ? (
                <OrderStatusItem name="delivering">Saiu para a entrega</OrderStatusItem>
              ) : (
                ""
              )}

              {order.status?.finished ? (
                <OrderStatusItem name="finished">Finalizado</OrderStatusItem>
              ) : (
                ""
              )}
            </OrderStatus>

            <OrderTitles>Resumo do Pedido</OrderTitles>

            <Restaurant>
              Restaurante:
              <RestaurantName name="restaurant">
                {order.restaurant_name}
              </RestaurantName>
            </Restaurant>
            {order.description?.map((element) => (
              <div key={element.item_id}>
                <OrderItem key={element.item_id}>
                  {this.formatOrder(element.quantity, element.name)}
                </OrderItem>
                <OrderItemPrice>{formatMoney(element.price)}</OrderItemPrice>
              </div>
            ))}

            <Total>
              Total:
              <TotalPrice name="price">
                {formatMoney(order.total_price)}
              </TotalPrice>
            </Total>

            {!order.status?.finished ? (
              <>
                {!this.lateCheck() ? (
                  <Deliver>
                    Entrega prevista para {this.deliveryTime()}.
                  </Deliver>
                ) : (
                  <LateDeliver name="late">
                    A entrega do pedido está atrasada!
                  </LateDeliver>
                )}
                <ButtonRight>
                  <Button
                    name="cancelOrderButton"
                    variant="danger"
                    type="button"
                    onClick={this.handleCancelOrder.bind(this)}
                  >
                    Cancelar Pedido
                  </Button>
                </ButtonRight>
              </>
            ) : (
              <Deliver>Pedido Finalizado</Deliver>
            )}
          </OrderDetailsPage>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ order }) => ({ order });

export default withRouter(
  connect(mapStateToProps, { ...OrderCreators })(OrderDetails)
);
