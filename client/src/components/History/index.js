import React, { Component } from "react";
import { Link } from "react-router-dom";

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
  RectangleFilter,
  RectangleDaysFilter,
  SelectStyle,
  TopDiv,
  CircleStyle,
  NoDataStyle,
  OptionStyle,
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
      elementToRateId: -1,
      data: [],
      restData: [],
      showRateFeedback: false,
      changeSelectedTdBg: [],
      canSendRate: false, // A avaliação com estrelas é obrigatória
      daysFilter: 30,
      currentPage: 0,
    };
  }

  componentDidMount() {
    this.props.getHistory({ query: this.state.daysFilter });
    this.props.getRestaurants({ query: "displayAll" });
  }

  getCicles() {
    const arr = [];
    for (let i = 0; i < this.numberOfCircles; i++) {
      arr.push(i);
    }

    return arr;
  }

  render() {
    const { orderToRate } = this.state;
    const { history, restaurants } = this.props;
    if (history.data.post)
      this.props.getHistory({ query: this.state.daysFilter });
    this.elemPerPages = 2;
    this.numberOfCircles = Math.ceil(
      this.state.data.length / this.elemPerPages
    );

    const cicles = this.getCicles();

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
        <TopDiv className="m-3">
          <BorderText>
            <h2 style={{ margin: "0 auto" }}>Histórico de Pedidos</h2>
          </BorderText>
          <RectangleFilter>
            Filtro de Dias
            <RectangleDaysFilter>
              <SelectStyle
                onChange={(elem) =>
                  this.setState(
                    {
                      daysFilter: elem.target.value,
                      orderToRate: -1,
                      elementToRateId: -1,
                      changeSelectedTdBg: [
                        ...this.state.changeSelectedTdBg,
                      ].map((element, idx) => false),
                    },
                    () =>
                      this.props.getHistory({ query: this.state.daysFilter })
                  )
                }
              >
                <OptionStyle value="30">30 dias</OptionStyle>
                <OptionStyle value="15">15 dias</OptionStyle>
                <OptionStyle value="7">7 dias</OptionStyle>
              </SelectStyle>
            </RectangleDaysFilter>
          </RectangleFilter>
        </TopDiv>
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
          <>
            <MainDiv>
              <Table borderless>
                <tbody>
                  {this.state.data &&
                  this.state.data.length &&
                  this.state.data === history.data ? (
                    this.state.restData && this.state.restData.length ? (
                      this.state.data.map((element, index) => {
                        if (
                          index >= this.state.currentPage * this.elemPerPages &&
                          index <
                            (this.state.currentPage + 1) * this.elemPerPages
                        )
                          return (
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
                                {!element.status.entregue ? (
                                  <Link to={`/detalhes/${element.id}`}>
                                    <Button variant="success" className="mx-3">
                                      Acompanhar pedido
                                    </Button>
                                  </Link>
                                ) : !element.rate.did ? (
                                  <Button
                                    variant="primary"
                                    disabled={orderToRate >= 0 ? true : false}
                                    onClick={() =>
                                      this.setState({
                                        orderToRate: index,
                                        elementToRateId: element.id,
                                        changeSelectedTdBg: [
                                          ...this.state.changeSelectedTdBg,
                                        ].map((element, idx) => {
                                          if (idx === index) return true;
                                          else return false;
                                        }),
                                        canSendRate:
                                          this.state.data[index].rate.stars !==
                                          0
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
                                        orderToRate: index,
                                        elementToRateId: element.id,
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
                          );
                        else return <></>; // O elemento não deve ser mostrado nesta página
                      })
                    ) : restaurants.data && restaurants.data.length ? (
                      this.setState({
                        restData: restaurants.data,
                      })
                    ) : (
                      // Sem restaurantes no banco
                      <NoDataStyle>
                        <h1>Nenhum restaurante encontrado em nosso banco</h1>
                        <h2>Desculpe o transtorno ☹</h2>
                        <Link to="/home" className="m-2">
                          <Button>Voltar à página inicial</Button>
                        </Link>
                      </NoDataStyle>
                    )
                  ) : history.data && history.data.length ? (
                    this.setState({
                      data: history.data,
                      changeSelectedTdBg: new Array(history.data.length),
                    })
                  ) : (
                    // Sem pedidos no banco
                    <NoDataStyle>
                      <h1>Não há pedidos registrados em sua conta</h1>
                      <h2>Volte a página inicial</h2>
                      <Link to="/home" className="m-2">
                        <Button>Voltar</Button>
                      </Link>
                    </NoDataStyle>
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
                        onChange={(newRating) =>
                          this.setState(
                            {
                              data: [...this.state.data].map(
                                (element, index) => {
                                  if (index === orderToRate)
                                    return {
                                      ...element,
                                      rate: {
                                        ...element.rate,
                                        stars: newRating,
                                      },
                                    };
                                  else return element;
                                }
                              ),
                              canSendRate: newRating === 0 ? false : true,
                            },
                            () => console.log(this.state.data[orderToRate].rate)
                          )
                        }
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
                      onChange={(text) =>
                        this.setState(
                          {
                            data: [...this.state.data].map((element, index) => {
                              if (index === orderToRate)
                                return {
                                  ...element,
                                  rate: {
                                    ...element.rate,
                                    feedback_text: text.target.value,
                                  },
                                };
                              else return element;
                            }),
                          },
                          () => console.log(this.state.data[orderToRate].rate)
                        )
                      }
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
                              elementToRateId: -1,
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
                                  data: this.state.data[orderToRate],
                                  changes: {
                                    rate: {
                                      stars:
                                        this.state.data[orderToRate].rate.stars,
                                      feedback_text:
                                        this.state.data[orderToRate].rate
                                          .feedback_text,
                                    },
                                    index: this.state.elementToRateId,
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
                          elementToRateId: -1,
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
            <RectangleFilter className="mt-3">
              {cicles.map((element, index) => (
                <button
                  key={index}
                  onClick={(e) =>
                    this.setState({
                      currentPage: e.target.childNodes[0].data - 1,
                      orderToRate: -1,
                      elementToRateId: -1,
                      changeSelectedTdBg: [
                        ...this.state.changeSelectedTdBg,
                      ].map((element, idx) => false),
                    })
                  }
                  style={{
                    all: "unset",
                    cursor: "pointer",
                  }}
                >
                  <CircleStyle>{element + 1}</CircleStyle>
                </button>
              ))}
            </RectangleFilter>
            <h5 className="mt-1">
              Atualmente na página {this.state.currentPage + 1}
            </h5>
          </>
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
