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
  NoDataStyle,
  OptionStyle,
  ButtonStyle,
} from "./styles";

// Pop-up -> detalhes
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import ReactLoading from "react-loading";

import { connect } from "react-redux";
import { Creators as HistoryCreator } from "../../store/ducks/history";
import { Table, Button, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

import { formatMoney } from "../../utils/misc";

class History extends Component {
  state = {
    orderToRate: -1,
    elementToRateId: -1,
    currentStarsValue: 0,
    currentFeedbackText: "",
    changeSelectedBg: [],
    canSendRate: false, // A avaliação com estrelas é obrigatória
    daysFilter: 30,
    currentPage: 0,
  };

  componentDidMount() {
    this.props.getHistory({ query: this.state.daysFilter });
  }

  clearRate() {
    this.setState({
      orderToRate: -1,
      elementToRateId: -1,
      currentFeedbackText: "",
      currentStarsValue: 0,
      changeSelectedBg: [...this.state.changeSelectedBg].map(
        (element, idx) => false
      ),
    });
  }

  cancelRate() {
    if (this.state.currentFeedbackText || this.state.currentStarsValue) {
      const resp = window.confirm(
        "Se você cancelar, todo progresso dessa avaliação será perdido"
      );
      if (resp) this.clearRate();
    } else this.clearRate();
  }

  handleSelectFilter(elem) {
    this.setState(
      {
        daysFilter: elem.target.value,
        orderToRate: -1,
        elementToRateId: -1,
        currentPage: 0,
        currentFeedbackText: "",
        currentStarsValue: 0,
        changeSelectedBg: [...this.state.changeSelectedBg].map(
          (element, idx) => false
        ),
      },
      () => this.props.getHistory({ query: elem.target.value })
    );
  }

  handlePageChange(elem) {
    this.setState({
      currentPage: elem.target.childNodes[0].data - 1,
      orderToRate: -1,
      elementToRateId: -1,
      currentFeedbackText: "",
      currentStarsValue: 0,
      changeSelectedBg: [...this.state.changeSelectedBg].map(
        (element, idx) => false
      ),
    });
  }

  handleRating(index, element, review = false) {
    if (review)
      this.setState({
        orderToRate: index,
        elementToRateId: element.id,
        changeSelectedBg: [...this.state.changeSelectedBg].map(
          (element, idx) => {
            if (idx === index) return true;
            else return false;
          }
        ),
      });
    else
      this.setState({
        orderToRate: index,
        elementToRateId: element.id,
        changeSelectedBg: [...this.state.changeSelectedBg].map(
          (element, idx) => {
            if (idx === index) return true;
            else return false;
          }
        ),
        canSendRate:
          this.props.history.data[index].rate.stars !== 0 ? true : false,
      });
  }

  sendRate() {
    const {
      orderToRate,
      elementToRateId,
      currentStarsValue,
      currentFeedbackText,
      daysFilter,
    } = this.state;
    const { history, postHistory } = this.props;

    const historyData = [...history.data];
    historyData[orderToRate] = {
      ...historyData[orderToRate],
      rate: {
        did: true,
        stars: currentStarsValue,
        feedback_text: currentFeedbackText,
      },
    };

    try {
      postHistory({
        data: historyData[orderToRate],
        changes: {
          rate: {
            stars: currentStarsValue,
            feedback_text: currentFeedbackText,
          },
          index: elementToRateId,
        },
        daysFilter: daysFilter,
      });
    } catch (err) {
      console.log(err);
    }
  }

  getCicles() {
    const arr = [];
    for (let i = 0; i < this.numberOfCircles; i++) {
      arr.push(i);
    }

    return arr;
  }

  render() {
    const { orderToRate, changeSelectedBg, canSendRate, currentPage } =
      this.state;
    const { history } = this.props;
    const { data, loading } = history;

    this.elemPerPages = 2;
    this.numberOfCircles = Math.ceil(data.length / this.elemPerPages);

    const cicles = this.getCicles();

    return (
      <PageStyle>
        <TopDiv className="m-3">
          <BorderText>
            <h2 style={{ margin: "0 auto" }}>Histórico de Pedidos</h2>
          </BorderText>
          {data && data.length ? (
            <RectangleFilter>
              Filtro de Dias
              <RectangleDaysFilter>
                <SelectStyle
                  onChange={(elem) => {
                    this.handleSelectFilter(elem);
                  }}
                >
                  <OptionStyle value="30">30 dias</OptionStyle>
                  <OptionStyle value="15">15 dias</OptionStyle>
                  <OptionStyle value="7">7 dias</OptionStyle>
                </SelectStyle>
              </RectangleDaysFilter>
            </RectangleFilter>
          ) : (
            <></>
          )}
        </TopDiv>
        {loading ? (
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
                  {data && data.length ? (
                    changeSelectedBg && changeSelectedBg.length ? (
                      data.map((element, index) => {
                        if (
                          index >= currentPage * this.elemPerPages &&
                          index < (currentPage + 1) * this.elemPerPages
                        )
                          return (
                            <tr
                              key={element.id}
                              style={
                                changeSelectedBg[index]
                                  ? { backgroundColor: "rgba(0, 0, 0, 0.2)" }
                                  : null
                              }
                            >
                              <ImageStyle photoUrl={element.orderImage} />
                              <td className="p-2">
                                <TableBodyStyle>
                                  <p style={{ fontSize: 26 }}>
                                    {element.restaurant_name}
                                  </p>
                                  <p>{element.description[0].name}</p>
                                  <p style={{ fontWeight: "bold" }}>
                                    {formatMoney(element.total_price)}
                                  </p>
                                </TableBodyStyle>
                              </td>
                              <td>
                                {!element.status.finished ? (
                                  <Link to={`/details/${element.id}`}>
                                    <Button variant="success" className="mx-3">
                                      Acompanhar pedido
                                    </Button>
                                  </Link>
                                ) : !element.rate.did ? (
                                  <Button
                                    variant="primary"
                                    disabled={orderToRate >= 0 ? true : false}
                                    onClick={() =>
                                      this.handleRating(index, element)
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
                                      this.handleRating(index, element, true)
                                    }
                                    className="mx-3"
                                  >
                                    Revisar avaliação
                                  </Button>
                                )}
                              </td>
                            </tr>
                          );
                        else return null; // O elemento não deve ser mostrado nesta página
                      })
                    ) : (
                      this.setState({
                        changeSelectedBg: new Array(data.length),
                      })
                    )
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
              {data && data.length && orderToRate > -1 ? (
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
                        <h2>{data[orderToRate].description[0].name}</h2>
                        <Popup
                          trigger={<Button variant="warning">Detalhes</Button>}
                          position="left center"
                        >
                          <DescriptionStyle className="p-2">
                            {data[orderToRate].description?.map((element) => (
                              <>
                                <h5>{element.name}</h5>
                                <p>{formatMoney(element.price)}</p>
                              </>
                            ))}
                          </DescriptionStyle>
                        </Popup>
                      </RateLabel>
                      <h3 className="mt-4">
                        {formatMoney(data[orderToRate].total_price)}
                      </h3>
                      <ReactStars
                        count={5}
                        onChange={(newRating) =>
                          this.setState({
                            currentStarsValue: newRating,
                            canSendRate: newRating === 0 ? false : true,
                          })
                        }
                        isHalf={true}
                        value={data[orderToRate].rate.stars}
                        edit={!data[orderToRate].rate.did}
                        size={50}
                        activeColor="#ffd700"
                      />
                    </Form.Label>
                    <Form.Control
                      disabled={data[orderToRate].rate.did}
                      as="textarea"
                      type="text"
                      className="mr-2"
                      defaultValue={
                        data[orderToRate].rate.feedback_text
                          ? data[orderToRate].rate.feedback_text
                          : ""
                      }
                      rows={12}
                      placeholder={
                        !data[orderToRate].rate.did ? "Deixe seu feeback!" : ""
                      }
                      onChange={(text) =>
                        this.setState({
                          currentFeedbackText: text.target.value,
                        })
                      }
                      style={{ fontWeight: "600" }}
                    />
                    <Form.Text className="text-muted">
                      Sua avaliação nos ajuda a melhorar a experiência do app :
                      {")"}
                    </Form.Text>
                  </Form.Group>
                  {!data[orderToRate].rate.did ? (
                    <>
                      <ActionButtonsStyle className="mt-2">
                        <Button
                          variant="secondary"
                          onClick={() => this.cancelRate()}
                        >
                          Cancelar
                        </Button>
                        <Button
                          variant="danger"
                          disabled={!canSendRate}
                          onClick={() => this.sendRate()}
                        >
                          Enviar
                        </Button>
                      </ActionButtonsStyle>
                      {!canSendRate ? (
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
                      onClick={() => this.clearRate()}
                      className="mt-2"
                    >
                      Voltar
                    </Button>
                  )}
                </Form>
              ) : null}
            </MainDiv>
            {data && data.length ? (
              <>
                <RectangleFilter className="mt-3">
                  {cicles.map((element, index) => (
                    <ButtonStyle
                      key={index}
                      onClick={(elem) => this.handlePageChange(elem)}
                    >
                      {currentPage === element ? (
                        <div
                          style={{
                            borderRadius: "63px",
                            border: "1px solid #ffffff",
                          }}
                        >
                          {element + 1}
                        </div>
                      ) : (
                        element + 1
                      )}
                    </ButtonStyle>
                  ))}
                </RectangleFilter>
              </>
            ) : null}
          </>
        )}
      </PageStyle>
    );
  }
}

const mapStateToProps = ({ history }) => ({
  history,
});

export default connect(mapStateToProps, {
  ...HistoryCreator,
})(History);
