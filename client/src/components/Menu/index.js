import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";

import { Creators as MenuCreators } from "../../store/ducks/menu";
import { Creators as CartCreators } from "../../store/ducks/cart";

import {
  ItemPhoto,
  PageStyle,
  TableStyle,
  TableBodyStyle,
  ItemData,
  ItemDescriptionStyle,
} from "./styles";

import ReactLoading from "react-loading";

import ReactStars from "react-rating-stars-component";

import { Button, Table } from "react-bootstrap";

import { formatMoney, withRouter } from "../../utils/misc";

import { API_URL } from "../../constants/constants";

class Menu extends Component {
  componentDidMount() {
    this.props.getMenu(this.props.router.params.id);
  }
  handleClick(item) {
    const { menu } = this.props;
    this.props.updateCart(
      menu.data.id,
      menu.data.name,
      { ...item, quantity: 0 },
      1
    );
  }
  getAverage(arr) {
    const count = arr?.reduce((acc, element) => acc + element.stars, 0);

    return count / arr?.length;
  }
  render() {
    const { menu } = this.props;
    const restaurant = menu.data;
    return (
      <>
        {menu.loading ? (
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
              value={this.getAverage(restaurant.rates)}
              edit={false}
              size={50}
              activeColor="#ffd700"
            />

            <Table borderless>
              <tbody>
                <tr className="mx-5">
                  <TableStyle>
                    {restaurant.menu?.options.map((element) => (
                      <td>
                        <TableBodyStyle>
                          <ItemPhoto className="m-2" photo={element.photo} />
                          <ItemData className="m-2">
                            <ItemDescriptionStyle>
                              <h4>{element.name}</h4>
                              {element.description}
                            </ItemDescriptionStyle>
                            <Button
                              style={{ width: "280px", paddingBottom: 0 }}
                              variant="outline-danger"
                              type="button"
                              onClick={(e) => this.handleClick(element)}
                            >
                              <strong>
                                Adicionar item ao carrinho
                                <h4>{" +R$" + formatMoney(element.price)}</h4>
                              </strong>
                            </Button>
                          </ItemData>
                        </TableBodyStyle>
                      </td>
                    ))}
                  </TableStyle>
                </tr>
              </tbody>
            </Table>
          </PageStyle>
        )}
      </>
    );
  }
}

const mapStateToProps = ({ menu }) => ({ menu });

export default withRouter(
  connect(mapStateToProps, { ...MenuCreators, ...CartCreators })(Menu)
);
