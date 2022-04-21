import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import {
  ItemPhoto,
  PageStyle,
  MenuStyle,
  MenuItemStyle,
  ItemData,
  ItemDescriptionStyle,
} from "./styles";

import ReactLoading from "react-loading";

import ReactStars from "react-rating-stars-component";

import { Button } from "react-bootstrap";

import { API_URL } from "../../constants/constants";

function getAverage(arr) {
  let count = 0;
  arr.forEach((element) => (count += element.stars));

  return count / arr.length;
}

export default function Menu() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchData() {
    const response = await fetch(API_URL + `/restaurants?id=${id}`);
    const jsonResp = await response.json();
    setRestaurant(jsonResp);
  }

  async function fetchPostDataCart(obj) {
    const response = await fetch(API_URL + "/cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    const jsonResp = await response.json();
  }

  useEffect(() => fetchData(), [id]);

  return (
    <>
      {!restaurant ? (
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
        <PageStyle className="m-3">
          <h1>{restaurant.name}</h1>
          <ReactStars
            count={5}
            isHalf={true}
            value={getAverage(restaurant.rates)}
            edit={false}
            size={50}
            activeColor="#ffd700"
          />
          <MenuStyle>
            {restaurant.menu.options.map((element) => (
              <MenuItemStyle className="mx-5">
                <ItemPhoto className="m-2" photo={element.photo} />
                <ItemData className="m-2">
                  <ItemDescriptionStyle>
                    {element.description}
                  </ItemDescriptionStyle>
                  <Button
                    style={{ width: "280px" }}
                    variant="outline-danger"
                    type="button"
                    onClick={(e) => fetchPostDataCart(element)}
                  >
                    <strong>Adicionar item ao carrinho</strong>
                  </Button>
                </ItemData>
              </MenuItemStyle>
            ))}
          </MenuStyle>
        </PageStyle>
      )}
    </>
  );
}
