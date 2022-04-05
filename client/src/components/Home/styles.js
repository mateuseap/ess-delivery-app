import styled from "styled-components";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

export const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TextStyle = (props) => (
  <h1
    style={{
      textAlign: "center",
      fontWeight: 500,
      fontSize: "2.5rem",
      lineHeight: "94px",
      color: "#630606",
    }}
  >
    {props.text}
  </h1>
);

export const CardStyle = (props) => (
  <Card
    key={props.restId}
    style={{
      borderRadius: "50px",
      alignItems: "center",
      width: "370px",
      background: "rgba(245, 245, 245, 0.8)",
    }}
    className="m-2"
  >
    <Card.Img
      variant="top"
      src={props.photo}
      style={{
        borderRadius: "50px",
      }}
    />
    <Card.Body
      style={{
        textAlign: "center",
      }}
    >
      <Card.Title style={{ color: "#E83A14" }}>{props.restName}</Card.Title>
      <Card.Text style={{ color: "#1B1A17" }}>{props.foodName}</Card.Text>
      <Card.Text style={{ color: "#05595B" }}>{props.description}</Card.Text>
    </Card.Body>
    {/* Quando apertar esse botão, o usuário deve ser redirecionado a tela de fazer pedidos com esse restaurante selecionado */}
    <Link to={`/fazer_pedido?restaurant_id=${props.restId}`}>
      <Button variant="success" className="m-2">
        PEÇA JÁ!
      </Button>
    </Link>
  </Card>
);
