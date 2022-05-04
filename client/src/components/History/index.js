import React, { Component } from "react";
import { Link } from "react-router-dom";

import {
  RateLabel,
  BorderText,
  PageStyle,
  MainDiv,
  TableDataStyle,
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
  CirclesStyle,
  MainButton,
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
import { deliveryFee } from "../../constants/constants";

const ITEMS_PER_PAGE = 2;

class History extends Component {
  state = {
    orderToRate: -1,
    elementToRateId: -1,
    currentStarsValue: 0,
    currentFeedbackText: "",
    changeSelectedBg: -1,
    canSendRate: false, // A avaliação com estrelas é obrigatória
    daysFilter: 30,
    currentPage: 0,
  };

  componentDidMount() {
    this.props.getHistory(this.state.daysFilter);
  }

  clearRate(aditionalStates) {
    this.setState({
      orderToRate: -1,
      elementToRateId: -1,
      currentFeedbackText: "",
      currentStarsValue: 0,
      changeSelectedBg: -1,
      ...aditionalStates,
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
    this.props.getHistory(elem.target.value);
    this.clearRate({
      daysFilter: elem.target.value,
      currentPage: 0,
    });
  }

  handlePageChange(elem) {
    this.clearRate({
      currentPage: elem.target.childNodes[0].data - 1,
    });
  }

  handleRating(index, element) {
    this.setState({
      orderToRate: index,
      elementToRateId: element.id,
      changeSelectedBg: index,
      canSendRate: this.props.history.data[index].rate.stars !== 0,
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

    this.props.postHistory({
      restaurantId: this.props.history.data[orderToRate].restaurant_id,
      rate: {
        stars: currentStarsValue,
        feedback_text: currentFeedbackText,
      },
      orderId: elementToRateId,
      daysFilter: daysFilter,
    });
  }

  getCircles() {
    const numberOfCircles = Math.ceil(
      this.props.history.data.length / ITEMS_PER_PAGE
    );

    return Array.from(Array(numberOfCircles).keys());
  }

  handleStars(newRating) {
    this.setState({
      currentStarsValue: newRating,
      canSendRate: newRating !== 0,
    });
  }

  renderDaysFilter() {
    return (
      <RectangleFilter>
        Filtro de Dias
        <RectangleDaysFilter>
          <SelectStyle
            value={this.state.daysFilter}
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
    );
  }

  renderOrderTableRow(element, index) {
    const { orderToRate, changeSelectedBg } = this.state;
    return (
      <tr
        key={element.id}
        style={
          changeSelectedBg === index
            ? {
                backgroundColor: "rgba(0, 0, 0, 0.2)",
              }
            : {}
        }
      >
        <ImageStyle photoUrl={element.orderImage} />
        <td className="p-2">
          <TableDataStyle>
            <p style={{ fontSize: 26 }}>{element.restaurant_name}</p>
            <p>{element.description[0].name}</p>
            <p style={{ fontWeight: "bold" }}>
              {formatMoney(element.total_price + deliveryFee)}
            </p>
          </TableDataStyle>
        </td>
        <td>
          {!element.status.finished ? (
            <Link to={`/details/${element.id}`}>
              <MainButton variant="green">Acompanhar pedido</MainButton>
            </Link>
          ) : (
            <MainButton
              name="ratingButton"
              variant={element.rate.did ? "" : "blue"}
              disabled={orderToRate >= 0}
              onClick={() => this.handleRating(index, element)}
            >
              {element.rate.did ? "Revisar avaliação" : "Avaliar Pedido"}
            </MainButton>
          )}
        </td>
      </tr>
    );
  }

  renderPagination() {
    return (
      <RectangleFilter className="mt-3">
        {this.getCircles().map((element, index) => (
          <CirclesStyle
            key={index}
            style={
              this.state.currentPage === element
                ? { border: "1px solid #ffffff" }
                : {}
            }
            onClick={(elem) => this.handlePageChange(elem)}
          >
            {element + 1}
          </CirclesStyle>
        ))}
      </RectangleFilter>
    );
  }

  render() {
    const { orderToRate, canSendRate, currentPage } = this.state;
    const { history } = this.props;
    const { data, loading } = history;

    return (
      <PageStyle>
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
            {data?.length ? (
              <>
                <TopDiv className="m-3">
                  <BorderText>Histórico de Pedidos</BorderText>
                  {this.renderDaysFilter()}
                </TopDiv>
                <MainDiv>
                  <Table borderless>
                    <tbody>
                      {data
                        .slice(
                          currentPage * ITEMS_PER_PAGE,
                          (currentPage + 1) * ITEMS_PER_PAGE
                        )
                        .map((element, index) => {
                          return this.renderOrderTableRow(element, index);
                        })}
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
                            <h2>{data[orderToRate].description[0].name}</h2>
                            <Popup
                              trigger={
                                <Button variant="warning">Detalhes</Button>
                              }
                              position="left center"
                            >
                              <DescriptionStyle className="p-2">
                                {data[orderToRate].description?.map(
                                  (element) => (
                                    <div key={element.name}>
                                      <h5>{element.name}</h5>
                                      <p>
                                        {formatMoney(
                                          element.price * element.quantity
                                        )}
                                      </p>
                                    </div>
                                  )
                                )}
                                <strong>Taxa de entrega</strong>
                                <p>{formatMoney(deliveryFee)}</p>
                                <div style={{ color: "#630606" }}>
                                  <strong>Forma de pagamento</strong>
                                  <p>{data[orderToRate].payment.type}</p>
                                </div>
                              </DescriptionStyle>
                            </Popup>
                          </RateLabel>
                          <h3 className="mt-4">
                            {formatMoney(
                              data[orderToRate].total_price + deliveryFee
                            )}
                          </h3>
                          <ReactStars
                            count={5}
                            onChange={this.handleStars.bind(this)}
                            isHalf={true}
                            value={data[orderToRate].rate.stars}
                            edit={!data[orderToRate].rate.did}
                            size={50}
                            activeColor="#ffd700"
                          />
                        </Form.Label>
                        <Form.Control
                          disabled={data[orderToRate].rate.did}
                          name="ratingFeedbackText"
                          as="textarea"
                          type="text"
                          className="mr-2"
                          defaultValue={data[orderToRate].rate.feedback_text}
                          rows={12}
                          placeholder={
                            !data[orderToRate].rate.did
                              ? "Deixe seu feeback!"
                              : ""
                          }
                          onChange={(text) =>
                            this.setState({
                              currentFeedbackText: text.target.value,
                            })
                          }
                          style={{ fontWeight: "600" }}
                        />
                        <Form.Text className="text-muted">
                          Sua avaliação nos ajuda a melhorar a experiência do
                          app :)
                        </Form.Text>
                      </Form.Group>
                      {!data[orderToRate].rate.did ? (
                        <>
                          <ActionButtonsStyle className="mt-2">
                            <Button
                              variant="secondary"
                              name="cancelRateButton"
                              onClick={() => this.cancelRate()}
                            >
                              Cancelar
                            </Button>
                            <Button
                              variant="danger"
                              disabled={!canSendRate}
                              name="sendRateButton"
                              onClick={() => this.sendRate()}
                            >
                              Enviar
                            </Button>
                          </ActionButtonsStyle>
                          {!canSendRate ? (
                            <DisabledSendButton>
                              <label>
                                Avaliação com estrelas é obrigatória para
                                continuar!
                              </label>
                            </DisabledSendButton>
                          ) : null}
                        </>
                      ) : (
                        <Button
                          variant="outline-primary"
                          name="backButton"
                          onClick={() => this.clearRate()}
                          className="mt-2"
                        >
                          Voltar
                        </Button>
                      )}
                    </Form>
                  ) : null}
                </MainDiv>
                {this.renderPagination()}
              </>
            ) : (
              <NoDataStyle>
                <h1>Não há pedidos registrados em sua conta</h1>
                <h2>Volte a página inicial</h2>
                <Link to="/home" className="m-2">
                  <Button>Voltar</Button>
                </Link>
              </NoDataStyle>
            )}
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
