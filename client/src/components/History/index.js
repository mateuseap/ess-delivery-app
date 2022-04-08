import React, { Component } from "react";
import {
  RateLabel,
  BorderText,
  PageStyle,
  MainDiv,
  TableStyle,
  TableBodyStyle,
  ActionButtonsStyle,
} from "./styles";

// Pop-up -> detalhes
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import { connect } from "react-redux";
import { Creators as HistoryCreator } from "../../store/ducks/history";
import { Table, Button, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderToRate: -1,
      stars: 0,
      alreadyDone: false,
    };
  }

  componentDidMount() {
    this.props.getHistory();
  }

  handleSubmitRate() {
    // code -> post and navigate
  }

  ratingChanged(newRating) {
    this.setState({ stars: newRating });
  }

  render() {
    const { data } = this.props.history;
    const { orderToRate } = this.state;
    return (
      <PageStyle>
        <BorderText className="m-3">
          <h1>Histórico de pedidos</h1>
        </BorderText>
        <MainDiv>
          <Table borderless variant="info">
            <TableStyle>
              <tbody>
                {data.map((element) => (
                  <tr key={element.id}>
                    <td className="p-2">
                      <TableBodyStyle>
                        <p>Pedido {element.id + 1}</p>
                        <p>Preço total: {element.total_price}</p>
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
                              alreadyDone: false,
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
                              alreadyDone: true,
                            })
                          }
                          className="mx-3"
                        >
                          Revisar avaliação
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableStyle>
          </Table>
          {orderToRate > -1 ? (
            <Form className="m-3">
              <Form.Group controlId="userFeedback">
                <Form.Label
                  className="m-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <RateLabel>
                    <h2>Pedido {data[orderToRate].id + 1}</h2>
                    <Popup
                      trigger={<Button variant="warning">Detalhes</Button>}
                      position="right center"
                    >
                      <div>{data[orderToRate].description}</div>
                    </Popup>
                  </RateLabel>
                  <ReactStars
                    count={5}
                    onChange={this.ratingChanged}
                    isHalf={true}
                    value={data[orderToRate].rate.stars}
                    edit={!this.state.alreadyDone}
                    size={50}
                    activeColor="#ffd700"
                  />
                </Form.Label>
                <Form.Control
                  disabled={this.state.alreadyDone}
                  as="textarea"
                  type="text"
                  className="mr-2"
                  rows={12}
                  placeholder={
                    !this.state.alreadyDone ? "Deixe seu feeback!" : ""
                  }
                  style={{ fontWeight: "600" }}
                >
                  {data[orderToRate].rate.feedback_text
                    ? data[orderToRate].rate.feedback_text
                    : ""}
                </Form.Control>
                <Form.Text className="text-muted">
                  Sua avaliação nos ajuda a melhorar a experiência do app :{")"}
                </Form.Text>
              </Form.Group>
              {!this.state.alreadyDone ? (
                <ActionButtonsStyle className="mt-2">
                  <Button
                    variant="secondary"
                    onClick={() => this.setState({ orderToRate: -1 })}
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="danger"
                    type="submit"
                    onSubmit={this.handleSubmitRate}
                  >
                    Enviar
                  </Button>
                </ActionButtonsStyle>
              ) : (
                <Button
                  variant="outline-primary"
                  onClick={() => this.setState({ orderToRate: -1 })}
                  className="mt-2"
                >
                  Voltar
                </Button>
              )}
            </Form>
          ) : null}
        </MainDiv>
      </PageStyle>
    );
  }
}

const mapStateToProps = ({ history }) => ({ history });

export default connect(mapStateToProps, { ...HistoryCreator })(History);
