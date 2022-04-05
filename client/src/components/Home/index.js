import React, { Component } from "react";
import { HomeStyle, TextStyle } from "./styles";

import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { Creators as RestaurantsCreator } from "../../store/ducks/restaurants";

class Home extends Component {
  getCardStyle(element) {
    return (
      <Card
        key={element.restId}
        style={{
          borderRadius: "50px",
          alignItems: "center",
          width: "350px",
          background: "rgba(245, 245, 245, 0.8)",
          listStyle: "none",
          flexBasis: "auto",
        }}
        className="m-4"
      >
        <Card.Img
          variant="top"
          src={element.photo}
          style={{
            borderRadius: "50px",
          }}
        />
        <Card.Body
          style={{
            textAlign: "center",
          }}
        >
          <Card.Title style={{ color: "#E83A14" }}>
            {element.restName}
          </Card.Title>
          <Card.Text style={{ color: "#1B1A17" }}>{element.foodName}</Card.Text>
          <Card.Text style={{ color: "#05595B" }}>
            {element.description}
          </Card.Text>
        </Card.Body>
        {/* Quando apertar esse botão, o usuário deve ser redirecionado a tela de fazer pedidos com esse restaurante selecionado */}
        <Link to={`/fazer_pedido?restaurant_id=${element.restId}`}>
          <Button variant="success" className="m-2">
            PEÇA JÁ!
          </Button>
        </Link>
      </Card>
    );
  }

  componentDidMount() {
    this.props.getRestaurants();
    this.h1Text =
      "Saboreie as deliciosas comidas dos nossos restaurantes parceiros!";
  }

  render() {
    return (
      <HomeStyle>
        <TextStyle className="m-1">{this.h1Text}</TextStyle>
        {this.props.restaurants.data.map((restaurant) =>
          this.getCardStyle({
            restId: restaurant.id,
            photo: restaurant.menu.options[restaurant.menu.destaqueIndex].photo,
            restName: restaurant.name,
            foodName:
              restaurant.menu.options[restaurant.menu.destaqueIndex].name,
            description:
              restaurant.menu.options[restaurant.menu.destaqueIndex]
                .description,
          })
        )}
      </HomeStyle>
    );
  }
}

const mapStateToProps = ({ restaurants }) => ({ restaurants });

export default connect(mapStateToProps, { ...RestaurantsCreator })(Home);
