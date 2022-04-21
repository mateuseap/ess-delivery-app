import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

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

import { Button } from "react-bootstrap";

import { API_URL } from "../../constants/constants";

function getAverage(arr) {
  let count = 0;
  arr.forEach((element) => (count += element.stars));

  return count / arr.length;
}

export default function Details() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchData() {
    const response = await fetch(API_URL + `/orders/${id}`);
    const jsonResp = await response.json();
    setOrder(jsonResp);
  }

  useEffect(() => fetchData(), [id]);

  return (
    <>
      <OrderDetailsPage>
        <h1>
          <OrderTitles>Status do Pedido</OrderTitles>
        </h1>
        <OrderStatus>
          <OrderStatusItem>Confirmado</OrderStatusItem>
          <OrderStatusItem>Em preparo</OrderStatusItem>
          <OrderStatusItem>Saiu para entrega</OrderStatusItem>
          <OrderStatusItem>Finalizado</OrderStatusItem>
        </OrderStatus>
        <h1>
          <OrderTitles>Resumo do Pedido</OrderTitles>
        </h1>
        <h4>
          <Restaurant>Restaurante: McDonald's</Restaurant>
        </h4>
        <OrderItem>01 BigMac</OrderItem>
        <OrderItemPrice>R$30</OrderItemPrice>
        <OrderItem>01 Refrigerante</OrderItem>
        <OrderItemPrice>R$5</OrderItemPrice>
        <OrderItem>01 Quarteirão</OrderItem>
        <OrderItemPrice>R$30</OrderItemPrice>
        <OrderItem>01 Suco</OrderItem>
        <OrderItemPrice>R$5</OrderItemPrice>
        <TotalPrice>Total: R$70</TotalPrice>
        <Deliver>Tempo de Entrega: 50 minutos</Deliver>
        <ButtonRight>
          <Button variant="danger" type="button">
            Cancelar Pedido
          </Button>
        </ButtonRight>

      </OrderDetailsPage>
    </>
  );
}
