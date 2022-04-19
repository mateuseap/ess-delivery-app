import React, { Component } from "react";
import {
  RateLabel,
  BorderText,
  PageStyle,
  MainDiv,
  TableBodyStyle,
  ActionButtonsStyle,
  ImageStyle,
  DescriptionStyle,
  DisabledSendButton,
} from "./styles";

// Pop-up -> detalhes
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import ReactLoading from "react-loading";

import { connect } from "react-redux";
import { Creators as HistoryCreator } from "../../store/ducks/history";
import { Creators as RestaurantsCreator } from "../../store/ducks/restaurants";
import { Table, Button, Form, Alert } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

import { formatMoney } from "../../utils/misc";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderToRate: -1,
      data: [],
      restData: [],
      showRateFeedback: false,
      changeSelectedTdBg: [],
      canSendRate: false, // A avaliação com estrelas é obrigatória
    };
  }

  componentDidMount() {
    this.props.getHistory();
    this.props.getRestaurants(true);
  }

  render() {
    const { orderToRate } = this.state;
    const { history, restaurants } = this.props;

    return (
      <PageStyle>
        {!restaurants.loading &&
        !history.loading &&
        this.state.showRateFeedback ? (
          !restaurants.error && !history.error ? (
            <Alert
              variant="success"
              onClose={() =>
                this.setState({
                  showRateFeedback: false,
                })
              }
              className="m-2"
              dismissible
            >
              <Alert.Heading>Avaliação enviada com sucesso.</Alert.Heading>
              <p>Obrigado por avaliar.</p>
            </Alert>
          ) : (
            <Alert
              variant="danger"
              onClose={() =>
                this.setState({
                  showRateFeedback: false,
                })
              }
              className="m-2"
              dismissible
            >
              <Alert.Heading>
                Erro ao enviar a atualização {" :("}
              </Alert.Heading>
              <p>Tente novamente mais tarde.</p>
            </Alert>
          )
        ) : null}
        <BorderText className="m-3">
          <h2 style={{ margin: "0 auto" }}>Histórico de Pedidos</h2>
        </BorderText>
        {history.loading || restaurants.loading ? (
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
          <MainDiv>
            <Table borderless>
              <tbody>
                {this.state.data && this.state.data.length ? (
                  this.state.restData && this.state.restData.length ? (
                    this.state.data.map((element, index) => (
                      <tr
                        key={element.id}
                        style={
                          this.state.changeSelectedTdBg[index]
                            ? { backgroundColor: "rgba(0, 0, 0, 0.2)" }
                            : null
                        }
                      >
                        <ImageStyle photoUrl={element.orderImage} />
                        <td className="p-2">
                          <TableBodyStyle>
                            <p style={{ fontSize: 26 }}>
                              {this.state.restData.map((rest) => {
                                if (rest.id === element.restaurant_id) {
                                  return rest.name;
                                }
                                return null;
                              })}
                            </p>
                            <p>{element.description[0].name}</p>
                            <p style={{ fontWeight: "bold" }}>
                              R{"$ " + formatMoney(element.total_price)}
                            </p>
                          </TableBodyStyle>
                        </td>
                        <td>
                          {!element.rate.did ? (
                            <Button
                              variant="primary"
                              disabled={orderToRate >= 0 ? true : false}
                              onClick={() =>
                                this.setState({
                                  orderToRate: element.id,
                                  changeSelectedTdBg: [
                                    ...this.state.changeSelectedTdBg,
                                  ].map((element, idx) => {
                                    if (idx === index) return true;
                                    else return false;
                                  }),
                                  canSendRate:
                                    this.state.data[element.id].rate.stars !== 0
                                      ? true
                                      : false,
                                })
                              }
                              className="mx-3"
                            >
                              Avaliar Pedido
                            </Button>
                          ) : (
                            <Button
                              variant="danger"
                              disabled={orderToRate >= 0 ? true : false}
                              onClick={() =>
                                this.setState({
                                  orderToRate: element.id,
                                  changeSelectedTdBg: [
                                    ...this.state.changeSelectedTdBg,
                                  ].map((element, idx) => {
                                    if (idx === index) return true;
                                    else return false;
                                  }),
                                })
                              }
                              className="mx-3"
                            >
                              Revisar avaliação
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : restaurants.data && restaurants.data.length ? (
                    this.setState({
                      restData: restaurants.data,
                    })
                  ) : (
                    <p>erro</p>
                  )
                ) : history.data && history.data.length ? (
                  this.setState({
                    data: history.data,
                    changeSelectedTdBg: new Array(history.data.length),
                  })
                ) : (
                  <p>erro</p>
                )}
              </tbody>
            </Table>
            {orderToRate > -1 ? (
              <Form style={{ maxWidth: 650 }}>
                <Form.Group controlId="userFeedback">
                  <Form.Label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <RateLabel>
                      <h2>
                        {this.state.data[orderToRate].description[0].name}
                      </h2>
                      <Popup
                        trigger={<Button variant="warning">Detalhes</Button>}
                        position="left center"
                      >
                        <DescriptionStyle>
                          {this.state.data[orderToRate].description.map(
                            (element) => (
                              <>
                                <h5>{element.name}</h5>
                                <p>{"R$ " + formatMoney(element.price)}</p>
                              </>
                            )
                          )}
                        </DescriptionStyle>
                      </Popup>
                    </RateLabel>
                    <h3 className="mt-4">
                      {"R$ " +
                        formatMoney(this.state.data[orderToRate].total_price)}
                    </h3>
                    <ReactStars
                      count={5}
                      onChange={(newRating) => {
                        const historyData = [...this.state.data];
                        historyData[orderToRate] = {
                          ...historyData[orderToRate],
                          rate: {
                            ...historyData[orderToRate].rate,
                            stars: newRating,
                          },
                        };

                        this.setState({
                          data: historyData,
                          canSendRate: newRating === 0 ? false : true,
                        });
                      }}
                      isHalf={true}
                      value={this.state.data[orderToRate].rate.stars}
                      edit={!this.state.data[orderToRate].rate.did}
                      size={50}
                      activeColor="#ffd700"
                    />
                  </Form.Label>
                  <Form.Control
                    disabled={this.state.data[orderToRate].rate.did}
                    as="textarea"
                    type="text"
                    className="mr-2"
                    defaultValue={
                      this.state.data[orderToRate].rate.feedback_text
                        ? this.state.data[orderToRate].rate.feedback_text
                        : ""
                    }
                    rows={12}
                    placeholder={
                      !this.state.data[orderToRate].rate.did
                        ? "Deixe seu feeback!"
                        : ""
                    }
                    onChange={(text) => {
                      const historyData = [...this.state.data];
                      historyData[orderToRate] = {
                        ...historyData[orderToRate],
                        rate: {
                          ...historyData[orderToRate].rate,
                          feedback_text: text.target.value,
                        },
                      };

                      this.setState({ data: historyData });
                    }}
                    style={{ fontWeight: "600" }}
                  />
                  <Form.Text className="text-muted">
                    Sua avaliação nos ajuda a melhorar a experiência do app :
                    {")"}
                  </Form.Text>
                </Form.Group>
                {!this.state.data[orderToRate].rate.did ? (
                  <>
                    <ActionButtonsStyle className="mt-2">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          this.setState({
                            orderToRate: -1,
                            changeSelectedTdBg: [
                              ...this.state.changeSelectedTdBg,
                            ].map((element, idx) => false),
                          })
                        }
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="danger"
                        disabled={!this.state.canSendRate}
                        onClick={() => {
                          const historyData = [...this.state.data];
                          historyData[orderToRate] = {
                            ...historyData[orderToRate],
                            rate: {
                              ...historyData[orderToRate].rate,
                              did: true,
                            },
                          };

                          try {
                            this.setState({ data: historyData }, () => {
                              this.props.postHistory({
                                data: this.state.data,
                                changes: {
                                  rate: {
                                    stars:
                                      this.state.data[orderToRate].rate.stars,
                                    feedback_text:
                                      this.state.data[orderToRate].rate
                                        .feedback_text,
                                  },
                                  index: orderToRate,
                                },
                              });
                              this.setState({ showRateFeedback: true });
                            });
                          } catch (err) {
                            this.setState({ showRateFeedback: true });
                            console.log(err);
                          }
                        }}
                      >
                        Enviar
                      </Button>
                    </ActionButtonsStyle>
                    {!this.state.canSendRate ? (
                      <DisabledSendButton>
                        <label>
                          Avaliação com estrelas é obrigatória para continuar!
                        </label>
                      </DisabledSendButton>
                    ) : null}
                  </>
                ) : (
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      this.setState({
                        orderToRate: -1,
                        changeSelectedTdBg: [
                          ...this.state.changeSelectedTdBg,
                        ].map((element, idx) => false),
                      })
                    }
                    className="mt-2"
                  >
                    Voltar
                  </Button>
                )}
              </Form>
            ) : null}
          </MainDiv>
        )}
      </PageStyle>
    );
  }
}

const mapStateToProps = ({ history, restaurants }) => ({
  history,
  restaurants,
});

export default connect(mapStateToProps, {
  ...HistoryCreator,
  ...RestaurantsCreator,
})(History);
