import React, { Component } from "react";
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
  RatingTextStyles,
} from "./styles";

import ReactLoading from "react-loading";

import ReactStars from "react-rating-stars-component";

import { Button, Table } from "react-bootstrap";

import { formatMoney, withRouter } from "../../utils/misc";

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
            <div className="d-inline-flex justify-content-center align-items-center">
              <ReactStars
                count={5}
                isHalf={true}
                value={this.getAverage(restaurant.rates)}
                edit={false}
                size={50}
                activeColor="#ffd700"
              />
              <RatingTextStyles className="p-3 mt-2">
                ({this.getAverage(restaurant.rates)})
              </RatingTextStyles>
            </div>

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
                              <h4 style={{ fontWeight: "600" }}>
                                {element.name}
                              </h4>
                              {element.description}
                            </ItemDescriptionStyle>
                            <Button
                              style={{
                                width: "280px",
                                paddingBottom: 0,
                                borderRadius: "65px",
                              }}
                              variant="outline-danger"
                              type="button"
                              onClick={(e) => {
                                this.handleClick(element);
                              }}
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
