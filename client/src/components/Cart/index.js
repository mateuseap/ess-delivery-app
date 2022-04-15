import React, { Component } from "react";
import {
  CartStyle,
  TextStyle,
  RestaurantText,
  ItemRow,
  HeaderRow,
  OrderButton,
  OrderTotalStyle,
  ItemNameHeader,
  ItemName,
  ItemTotal,
  ItemQuantity,
  ItemPrice,
  RemoveButton,
  AddButton,
  ItemImg,
} from "./styles";

import ReactLoading from "react-loading";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { Creators as CartCreator } from "../../store/ducks/cart";

class Cart extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  addItem(item) {}

  removeItem(item) {}

  render() {
    const { cart } = this.props;

    return (
      <CartStyle>
        {cart.loading ? (
          <ReactLoading
            type={"spin"}
            style={{
              position: "absolute",
              width: "10vw",
              top: "40%",
              left: "0",
              right: "0",
              margin: "auto",
            }}
          />
        ) : (
          <>
            <TextStyle>Seu carrinho de compras</TextStyle>
            <RestaurantText>Restaurante: {cart.data.rest_name}</RestaurantText>

            <HeaderRow>
              <ItemNameHeader>Item</ItemNameHeader>
              <ItemQuantity>Qtd</ItemQuantity>
              <ItemPrice>Preço unitário</ItemPrice>
              <ItemTotal>Total do item</ItemTotal>
            </HeaderRow>

            {cart.data.items?.map((item) => (
              <ItemRow>
                <ItemImg src={item.photo}></ItemImg>
                <ItemName>{item.name}</ItemName>
                <ItemQuantity>{item.quantity}</ItemQuantity>
                <ItemPrice>R${item.price}</ItemPrice>
                <AddButton onclick={this.addItem}>+</AddButton>
                <RemoveButton onclick={this.removeItem}>-</RemoveButton>
                <ItemTotal>R${item.quantity * item.price}</ItemTotal>
              </ItemRow>
            ))}

            <OrderTotalStyle>Total: R${cart.data.total}</OrderTotalStyle>
            <OrderButton>Fazer Pedido</OrderButton>
          </>
        )}
      </CartStyle>
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps, { ...CartCreator })(Cart);
