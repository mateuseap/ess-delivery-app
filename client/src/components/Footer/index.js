import React, { Component } from "react";
import * as Styles from "./styles";

export default class Footer extends Component {
  constructor(props) {
    super(props);
    this.group = [
      "Enrique Laborão",
      "Guilherme Morone",
      "Lucca Gioia",
      "Mateus Elias",
      "Rafael Leite",
      "Raul Coelho",
      "Williams Santiago",
    ];
  }
  
  render() {
    return (
      <Styles.Box className="mt-5">
        <Styles.Heading>Desenvolvido por:</Styles.Heading>
        <Styles.Container>
          <Styles.Row className="mb-4">
            {this.group.map((p) => (
              <Styles.Column>
                <Styles.Name>{p}</Styles.Name>
              </Styles.Column>
            ))}
          </Styles.Row>
          <Styles.Row className="mb-4">
            <Styles.Column>
              ESS 2021.2 - Engenharia da Computação (E6)
            </Styles.Column>
          </Styles.Row>
          <Styles.Row className="mb-4">
            <Styles.Column>
              <Styles.FooterLink
                href="https://github.com/Enriqson/ess-delivery-app/"
                target="_blank"
              >
                Repositório
              </Styles.FooterLink>
            </Styles.Column>
          </Styles.Row>
        </Styles.Container>
      </Styles.Box>
    );
  }
}
