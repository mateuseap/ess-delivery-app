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

import { connect } from "react-redux";
import { Creators as HistoryCreator } from "../../store/ducks/history";
import { Table, Button, Container, Col, Row, Form } from "react-bootstrap";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderToRate: -1,
    };
  }

  componentDidMount() {
    this.props.getHistory();
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
                      <Button
                        variant="primary"
                        onClick={() => this.setState({ orderToRate: 0 })}
                        className="mx-3"
                      >
                        Avaliar Pedido
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </TableStyle>
          </Table>
          {orderToRate > -1 ? (
            <Form className="m-3">
              <Form.Group controlId="userFeedback">
                <Form.Label>
                  <RateLabel>
                    <h2>Pedido {data[orderToRate].id + 1}</h2>
                    <Button variant="warning">Detalhes</Button>
                  </RateLabel>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  type="text"
                  className="mr-2"
                  rows={12}
                  placeholder="Deixe seu feeback!"
                />
                <Form.Text className="text-muted">
                  Sua avaliação nos ajuda a melhorar a experiência do app :{")"}
                </Form.Text>
              </Form.Group>
              <ActionButtonsStyle className="mt-2">
                <Button
                  variant="danger"
                  onClick={() => this.setState({ orderToRate: -1 })}
                >
                  Cancelar
                </Button>
                <Button variant="success">Enviar</Button>
              </ActionButtonsStyle>
            </Form>
          ) : null}
        </MainDiv>
      </PageStyle>
    );
  }
}

const mapStateToProps = ({ history }) => ({ history });

export default connect(mapStateToProps, { ...HistoryCreator })(History);
