import React, { Component } from "react";
import {
  HomeStyle,
  TextStyle,
  CardTitle,
  DishName,
  DishDescription,
  CardGroup,
  CardBody,
  DishImg,
  Card,
} from "./styles";

import ReactLoading from "react-loading";

import { Link } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";

import FadeIn from "react-fade-in";

import { connect } from "react-redux";
import { Creators as RestaurantsCreator } from "../../store/ducks/restaurants";

class Home extends Component {
  getCard(element) {
    return (
      <Card key={element.restId} style={{ position: "relative" }}>
        <DishImg>
          <img variant="top" src={element.dishPhoto} alt={element.dishName} />
        </DishImg>

        <CardBody className="mb-5">
          <CardTitle>{element.restName}</CardTitle>
          <DishName>{element.dishName}</DishName>
          <DishDescription>{element.dishDescription}</DishDescription>
          {/* Quando apertar esse botão, o usuário deve ser redirecionado a tela de fazer pedidos com esse restaurante selecionado */}
          <Link to={`/fazer_pedido?restaurant_id=${element.restId}`}>
            <Button
              variant="success"
              className="m-2"
              style={{ position: "absolute", bottom: 0, left: "33.333%" }}
            >
              PEÇA JÁ!
            </Button>
          </Link>
        </CardBody>
      </Card>
    );
  }

  componentDidMount() {
    this.props.getRestaurants();
  }

  render() {
    const { restaurants } = this.props;

    return (
      <Container>
        {restaurants.loading ? (
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
          <HomeStyle>
            <Row>
              <Col>
                <FadeIn transitionDuration={1000}>
                  <TextStyle style={{ color: "#91091e" }}>
                    Saboreie as deliciosas comidas dos nossos restaurantes
                    parceiros!
                  </TextStyle>
                </FadeIn>
              </Col>
            </Row>
            <FadeIn transitionDuration={800}>
              <CardGroup>
                {this.props.restaurants.data.map((restaurant) => {
                  const dish =
                    restaurant.menu.options[restaurant.menu.destaqueIndex];
                  return this.getCard({
                    restId: restaurant.id,
                    dishPhoto: dish.photo,
                    restName: restaurant.name,
                    dishName: dish.name,
                    dishDescription: dish.description,
                  });
                })}
              </CardGroup>
            </FadeIn>
          </HomeStyle>
        )}
      </Container>
    );
  }
}

const mapStateToProps = ({ restaurants }) => ({ restaurants });

export default connect(mapStateToProps, { ...RestaurantsCreator })(Home);
