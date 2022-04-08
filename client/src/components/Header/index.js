import React, { Component } from "react";
import * as Styles from "./styles";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { Creators as UserCreators } from "../../store/ducks/user";

import ReactLoading from "react-loading";

import { getHistorySvg, getCartSvg } from "../../assets/headerAssets";

class Header extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    const { user } = this.props;
    return (
      <Styles.HeaderStyle>
        <Styles.Title>
          {user.loading ? <ReactLoading type={"spin"} /> : user.data.name}
        </Styles.Title>
        <Styles.Buttons>
          <Link to="/history">{getHistorySvg()}</Link>
          <Link to="/cart">{getCartSvg()}</Link>
          <Link to="/home">
            <Styles.UserBg>
              <Styles.UserPhoto photoUrl={user.data.photo} />
            </Styles.UserBg>
          </Link>
        </Styles.Buttons>
      </Styles.HeaderStyle>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { ...UserCreators })(Header);
