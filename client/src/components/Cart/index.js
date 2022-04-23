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
  RedirectHomeButton,
} from "./styles";

import ReactLoading from "react-loading";

import { withRouter } from "../../utils/misc";

import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { Creators as CartCreator } from "../../store/ducks/cart";
import { Creators as OrderCreator } from "../../store/ducks/order";

import { formatMoney } from "../../utils/misc";

class Cart extends Component {
  componentDidMount() {
    this.props.getCart();
  }

  addItem(index) {
    const { cart } = this.props;

    this.props.updateCart(
      cart.data.rest_id,
      cart.data.rest_name,
      cart.data.items[index],
      1
    );
  }

  removeItem(index) {
    const { cart } = this.props;

    this.props.updateCart(
      cart.data.rest_id,
      cart.data.rest_name,
      cart.data.items[index],
      -1
    );
  }

  handleMakeOrder() {
    const callback = (id) => {
      this.props.router.navigate(`/details/${id}`);
    };
    this.props.makeOrder(callback);
  }

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
            {cart.data?.items?.length ? (
              <>
                <TextStyle>Seu carrinho de compras</TextStyle>
                <RestaurantText>
                  Restaurante: {cart.data.rest_name}
                </RestaurantText>

                <HeaderRow>
                  <ItemNameHeader>Item</ItemNameHeader>
                  <ItemQuantity>Qtd</ItemQuantity>
                  <ItemPrice>Preço unitário</ItemPrice>
                  <ItemTotal>Total do item</ItemTotal>
                </HeaderRow>

                {cart.data.items?.map((item, index) => (
                  <ItemRow key={item.item_id}>
                    <ItemImg src={item.photo}></ItemImg>
                    <ItemName>{item.name}</ItemName>
                    <ItemQuantity>{item.quantity}</ItemQuantity>
                    <ItemPrice>{formatMoney(item.price)}</ItemPrice>
                    <AddButton onClick={() => this.addItem(index)}>+</AddButton>
                    <RemoveButton onClick={() => this.removeItem(index)}>
                      -
                    </RemoveButton>
                    <ItemTotal>
                      {formatMoney(item.quantity * item.price)}
                    </ItemTotal>
                  </ItemRow>
                ))}

                <OrderTotalStyle>
                  Total: {formatMoney(cart.data.total)}
                </OrderTotalStyle>
                <OrderButton onClick={() => this.handleMakeOrder()}>
                  Fazer Pedido
                </OrderButton>
              </>
            ) : (
              <>
                <TextStyle>
                  Seu carrinho está vazio :(
                  <br />
                  Adicione itens em um de nossos restaurantes!
                </TextStyle>
                <Link to="/home" style={{ textDecoration: "none" }}>
                  <RedirectHomeButton> Ver restaurantes </RedirectHomeButton>
                </Link>
              </>
            )}
          </>
        )}
      </CartStyle>
    );
  }
}

const mapStateToProps = ({ cart }) => ({ cart });

export default withRouter(
  connect(mapStateToProps, { ...CartCreator, ...OrderCreator })(Cart)
);
