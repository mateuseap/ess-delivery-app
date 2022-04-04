import React, { Component, useState } from "react";
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
    this.state = {
      numberOfRestaurants: 0,
    };
  }

  componentDidMount() {
    this.props.getRestaurants();
    this.state.numberOfRestaurants = this.props.restaurants.data.length;
  }

  render() {
    return (
      <HomeStyle>
        <Container>
          <Row
            style={{
              width: "60%",
            }}
          >
            <h1
              style={{
                "text-align": "center",
                color: "#630606",
              }}
              className="m-1"
            >
              Lista de Restaurantes
            </h1>
            {this.props.restaurants.data.map((restaurant) => (
              <Col>
                <Card
                  key={restaurant.id}
                  style={{
                    "border-radius": "50px",
                    "align-items": "center",
                    width: "300px",
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
                      "border-radius": "50px",
                    }}
                  />
                  <Card.Body style={{ "text-align": "center" }}>
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
