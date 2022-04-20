import React, { useEffect } from "react";
import { useParams } from "react-router";

import ReactLoading from "react-loading";

import { connect } from "react-redux";
import { Creators as RestaurantsCreator } from "../../store/ducks/restaurants";

function Menu(props) {
  const { id } = useParams();
  const { restaurants } = props;

  useEffect(() => {
    props.getRestaurants({ query: id });
  }, [id]);

  return (
    <>
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
      ) : restaurants.data &&
        restaurants.data.menu &&
        restaurants.data.menu.options &&
        restaurants.data.menu.options.length ? (
        restaurants.data.menu.options.map((element) => (
          <h1>{element.description}</h1>
        ))
      ) : null}
    </>
  );
}

const mapStateToProps = ({ restaurants }) => ({ restaurants });

export default connect(mapStateToProps, { ...RestaurantsCreator })(Menu);
