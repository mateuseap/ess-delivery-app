import React, { Component } from "react";
import { HeaderStyle, Title, Buttons, UserPhoto, UserBg } from "./styles";
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
      <HeaderStyle>
        <Title>
          {user.loading ? <ReactLoading type={"spin"} /> : user.data.name}
        </Title>
        <Buttons>
          <Link to="/history">{getHistorySvg()}</Link>
          <Link to="/cart">{getCartSvg()}</Link>
          <Link to="/home">
            <UserBg>
              <UserPhoto photoUrl={user.data.photo} />
            </UserBg>
          </Link>
        </Buttons>
      </HeaderStyle>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { ...UserCreators })(Header);
