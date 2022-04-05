import React, { Component } from "react";
import { HomeStyle, CardStyle, TextStyle } from "./styles";

import { Container, Row, Col } from "react-bootstrap";

import { connect } from "react-redux";
import { Creators as RestaurantsCreator } from "../../store/ducks/restaurants";

class Home extends Component {
  componentDidMount() {
    this.props.getRestaurants();
    this.h1Text =
      "Saboreie as deliciosas comidas dos nossos restaurantes parceiros!";
  }

  render() {
    return (
      <HomeStyle>
        <Container>
          <Row>
            <TextStyle text={this.h1Text} className="m-1" />
            {this.props.restaurants.data.map((restaurant) => (
              <Col>
                <CardStyle
                  restId={restaurant.id}
                  photo={
                    restaurant.menu.options[restaurant.menu.destaqueIndex].photo
                  }
                  restName={restaurant.name}
                  foodName={
                    restaurant.menu.options[restaurant.menu.destaqueIndex].name
                  }
                  description={
                    restaurant.menu.options[restaurant.menu.destaqueIndex]
                      .description
                  }
                />
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
