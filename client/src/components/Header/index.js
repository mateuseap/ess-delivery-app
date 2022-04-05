import React, { Component } from "react";
import * as Styles from "./styles";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { Creators as UserCreators } from "../../store/ducks/user";

import ReactLoading from "react-loading";

import { Container, Row, Col } from "react-bootstrap";

import { getHistorySvg, getCartSvg } from "../../assets/headerAssets";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";

class Header extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    const { user } = this.props;
    return (
      <Container>
        <Row>
          <Styles.HeaderStyle>
            <Col>
              <Styles.Title>
                {user.loading ? <ReactLoading type={"spin"} /> : user.data.name}
              </Styles.Title>
            </Col>
            <Col>
              {user.data.addresses ? (
                <FloatingLabel
                  controlId="floatingAddressLabelSelect"
                  label="Escolha seu endereço"
                >
                  <Styles.FormStyled addresses={user.data.addresses} />
                </FloatingLabel>
              ) : (
                <p>Nenhum endereço</p>
              )}
            </Col>
            <Col>
              <Styles.Buttons>
                <Link to="/history">{getHistorySvg()}</Link>
                <Link to="/cart">{getCartSvg()}</Link>
                <Link to="/home">
                  <Styles.UserBg>
                    <Styles.UserPhoto photoUrl={user.data.photo} />
                  </Styles.UserBg>
                </Link>
              </Styles.Buttons>
            </Col>
          </Styles.HeaderStyle>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { ...UserCreators })(Header);
