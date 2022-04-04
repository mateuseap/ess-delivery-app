import React, { Component } from "react";
import { HeaderStyle, Title, Buttons, UserPhoto, UserBg } from "./styles";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { Creators as UserCreators } from "../../store/ducks/user";

import ReactLoading from "react-loading";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
          <HeaderStyle>
            <Col>
              <Title>
                {user.loading ? <ReactLoading type={"spin"} /> : user.data.name}
              </Title>
            </Col>
            <Col>
              {user.data.adresses ? (
                <FloatingLabel
                  controlId="floatingAddressLabelSelect"
                  label="Escolha seu endereço"
                >
                  <Form.Select style={{ color: "#890F0D" }}>
                    {user.data.adresses.map((end, index) => (
                      <option value={index}>{end}</option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              ) : (
                <p>Nenhum endereço</p>
              )}
            </Col>
            <Col>
              <Buttons>
                <Link to="/history">{getHistorySvg()}</Link>
                <Link to="/cart">{getCartSvg()}</Link>
                <Link to="/home">
                  <UserBg>
                    <UserPhoto photoUrl={user.data.photo} />
                  </UserBg>
                </Link>
              </Buttons>
            </Col>
          </HeaderStyle>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, { ...UserCreators })(Header);
