import React from "react";
import { OtherStyle } from "./styles";
import { useNavigate } from "react-router";
import { Button } from "react-bootstrap";

export default function OtherRoute() {
  const navigate = useNavigate();

  function handleRouting(route) {
    navigate(route.target.id);
  }

  return (
    <OtherStyle>
      Essa é outra pagina :)
      <ul>
        <li>
          <Button variant="outline-primary" id="/other" onClick={handleRouting}>
            Other
          </Button>
        </li>
        <li>
          <Button variant="outline-primary" id="/home" onClick={handleRouting}>
            Home
          </Button>
        </li>
      </ul>
    </OtherStyle>
  );
}
