import React, { Component } from "react";
import { FooterStyle } from "./styles";

export default class Footer extends Component {
  render() {
    this.group = [
      "Enrique Laborão",
      "Guilherme Morone",
      "Lucca Gioia",
      "Mateus Elias",
      "Rafael Leite",
      "Raul Coelho",
      "Williams Santiago",
    ];
    return (
      <FooterStyle className="pt-5">
        <h4>Desenvolvido por:</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {this.group.map((p) => (
            <p>{p}</p>
          ))}
        </div>
      </FooterStyle>
    );
  }
}
