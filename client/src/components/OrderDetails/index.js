import React, { Component } from "react";
import { connect } from "react-redux";
import { Creators as OrderDetailsCreators } from "../../store/ducks/orderDetails";
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
  OrderItem,
  OrderItemPrice,
  TotalPrice,
  Deliver,
  ButtonRight,
} from "./styles";

import NotFound from "../NotFound";

class OrderDetails extends Component {
  componentDidMount() {
    const { id } = this.props.router.params;
    this.props.getOrderDetails(id);
  }

  formatOrder(quantity, name) {
    return quantity < 10 ? `0${quantity} - ${name}` : `${quantity} - ${name}`;
  }

  render() {
    const { orderDetails } = this.props;
    const order = orderDetails.data;
    if (orderDetails.error) return <NotFound />;
    return (
      <>
        {orderDetails.loading || !order ? (
          <ReactLoading type={"spin"} />
        ) : (
          <OrderDetailsPage>
            <OrderTitles>Status do Pedido</OrderTitles>

            <OrderStatus>
              {order.status?.confirmed ? (
                <OrderStatusItem>Confirmado</OrderStatusItem>
              ) : (
                ""
              )}

              {order.status?.preparing ? (
                <OrderStatusItem>Em preparo</OrderStatusItem>
              ) : (
                ""
              )}

              {order.status?.delivering ? (
                <OrderStatusItem>Saiu para a entrega</OrderStatusItem>
              ) : (
                ""
              )}

              {order.status?.finished ? (
                <OrderStatusItem>Finalizado</OrderStatusItem>
              ) : (
                ""
              )}
            </OrderStatus>

            <OrderTitles>Resumo do Pedido</OrderTitles>

            <Restaurant>Restaurante: {order.restaurant_name}</Restaurant>

            {order.description?.map((element) => (
              <div key={element.item_id}>
                <OrderItem key={element.item_id}>
                  {this.formatOrder(element.quantity, element.name)}
                </OrderItem>
                <OrderItemPrice>R${formatMoney(element.price)}</OrderItemPrice>
              </div>
            ))}

            <TotalPrice>Total: R${formatMoney(order.total_price)}</TotalPrice>
            <Deliver>Tempo de Entrega: 50 minutos</Deliver>
            <ButtonRight>
              <Button variant="danger" type="button">
                Cancelar Pedido
              </Button>
            </ButtonRight>
          </OrderDetailsPage>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ orderDetails }) => ({ orderDetails });

export default withRouter(
  connect(mapStateToProps, { ...OrderDetailsCreators })(OrderDetails)
);
