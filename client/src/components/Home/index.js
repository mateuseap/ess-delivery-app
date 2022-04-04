import React, { Component } from "react";
import { HomeStyle } from "./styles";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { connect } from "react-redux";
import { Creators as RestaurantsCreator } from "../../store/ducks/restaurants";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getRestaurants();
  }

  render() {
    return (
      <HomeStyle>
        <Container>
          <Row>
            <h1
              style={{
                textAlign: "center",
                fontWeight: 500,
                fontSize: "3rem",
                lineHeight: "94px",
                color: "#630606",
              }}
              className="m-1"
            >
              Saboreie os destaques de nossos restaurantes parceiros!
            </h1>
            {this.props.restaurants.data.map((restaurant) => (
              <Col>
                <Card
                  key={restaurant.id}
                  style={{
                    borderRadius: "50px",
                    alignItems: "center",
                    width: "370px",
                    background: "#F5F5F5",
                  }}
                  className="m-2"
                >
                  <Card.Img
                    variant="top"
                    src={
                      restaurant.menu.options[restaurant.menu.destaqueIndex]
                        .photo
                    }
                    style={{
                      borderRadius: "50px",
                    }}
                  />
                  <Card.Body style={{ textAlign: "center" }}>
                    <Card.Title style={{ color: "#E83A14" }}>
                      {restaurant.name}
                    </Card.Title>
                    <Card.Text style={{ color: "#1B1A17" }}>
                      {
                        restaurant.menu.options[restaurant.menu.destaqueIndex]
                          .name
                      }
                    </Card.Text>
                    <Card.Text style={{ color: "#05595B" }}>
                      {
                        restaurant.menu.options[restaurant.menu.destaqueIndex]
                          .description
                      }
                    </Card.Text>
                  </Card.Body>
                  <Button variant="success" className="m-2">
                    PEÇA JÁ!
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </HomeStyle>
    );
  }
}

const mapStateToProps = ({ restaurants }) => ({ restaurants });

export default connect(mapStateToProps, { ...RestaurantsCreator })(Home);
