import React, { Component } from "react";
import * as Styles from "./styles";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { Creators as UserCreators } from "../../store/ducks/user";
import { Creators as CartCreators } from "../../store/ducks/cart";

import ReactLoading from "react-loading";

import { getHistorySvg, getCartSvg } from "../../assets/headerAssets";

class Header extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getCart();
  }

  getCartItemCount() {
    const { cart } = this.props;
    if (cart.data?.items) return cart.data.items.length;
    else return 0;
  }

  render() {
    const { user, cart } = this.props;
    return (
      <Styles.HeaderStyle>
        {user.loading || cart.loading ? (
          <ReactLoading type={"spin"} />
        ) : (
          <>
            <Styles.Title name="headerUserName">{user.data.name}</Styles.Title>
            <Styles.Buttons>
              <Link to="/history">{getHistorySvg()}</Link>
              <Link to="/cart" style={{ position: "relative" }}>
                {getCartSvg()}
                <Styles.CartItemCount name="headerCartItemCount">
                  {this.getCartItemCount()}
                </Styles.CartItemCount>
              </Link>
              <Link to="/home">
                <Styles.UserBg>
                  <Styles.UserPhoto src={user.data.photo} />
                </Styles.UserBg>
              </Link>
            </Styles.Buttons>
          </>
        )}
      </Styles.HeaderStyle>
    );
  }
}

const mapStateToProps = ({ user, cart }) => ({ user, cart });

export default connect(mapStateToProps, { ...UserCreators, ...CartCreators })(
  Header
);
