import styled from "styled-components";

import {
  DEFAULT_RED,
  DARK_RED,
  DEFAULT_BLUE,
  DARK_BLUE,
  DEFAULT_GREEN,
  DARK_GREEN,
} from "../components/App/App.style";

const handleColorType = (color) => {
  switch (color) {
    case "green":
      return DEFAULT_GREEN;
    case "blue":
      return DEFAULT_BLUE;
    default:
      return DEFAULT_RED;
  }
};

const handleDarkColorType = (color) => {
  switch (color) {
    case "green":
      return DARK_GREEN;
    case "blue":
      return DARK_BLUE;
    default:
      return DARK_RED;
  }
};

export const StyledButton = styled.button`
  background-color: ${(props) => handleColorType(props.variant)};
  cursor: pointer;
  border-radius: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
  padding: 12px 5% 12px 5%;
  color: white;
  width: fit-content;
  border: 0px;
  display: inline-block;

  :hover {
    background-color: ${(props) => handleDarkColorType(props.variant)};
  }

  :disabled {
    cursor: auto;
    opacity: 0.6;
  }
`;
