import styled from "styled-components";

import { StyledButton } from "../../utils/styles";
import { DEFAULT_RED } from "../App/App.style";

export const CartStyle = styled.div`
  width: 90%;
  margin: auto;
`;

export const TextStyle = styled.h1`
  text-align: center;
  font-weight: bold;
  padding-top: 1.2rem;
  color: black;
`;

export const RestaurantText = styled.div`
  font-size: 2rem;
  padding-left: 10%;
  line-height: 94px;
  padding-top: 0.5rem;
  color: ${DEFAULT_RED};
`;

export const HeaderRow = styled.div`
  font-size: 2rem;
  text-align: center;
  font-weight: bold;
  color: black;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: row;
`;

export const ItemRow = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  text-align: center;
  font-weight: bold;
  color: black;
  padding-top: 0.5rem;
  align-items: center;
`;

export const ItemNameHeader = styled.div`
  width: 30%;
  margin-left: 7vw;
`;
export const ItemName = styled.div`
  width: 30%;
`;

export const ItemPrice = styled.div`
  width: 20%;
`;
export const ItemQuantity = styled.div`
  width: 15%;
`;

export const ItemTotal = styled.div`
  margin-left: auto;
  text-align: end;
  width: 15%;
`;

export const AddButton = styled(StyledButton)`
  padding: 0;
  margin-left: 2%;
  margin-right: 2.5%;
  font-size: 2.5rem;
  width: 3.5rem;
  border-radius: 50%;
`;
export const RemoveButton = styled(StyledButton)`
  font-size: 3.4rem;
  padding: 0 7px 6px 5px;
  line-height: 1;
  width: 3.5rem;
  border-radius: 50%;
`;

export const OrderTotalStyle = styled.div`
  color: ${DEFAULT_RED};
  font-size: 1.5rem;
  margin-left: auto;
  width: fit-content;
  padding: 12px 5% 20px 5%;
  font-weight: bold;
`;

export const OrderButton = styled(StyledButton)`
  margin-left: auto;
  display: flex;
`;

export const ItemImg = styled.div`
  content: url(${(props) => props.src});
  border-radius: 50px;
  width: 7.5vw;
  height: 8.8vh;
`;

export const RedirectHomeButton = styled(StyledButton)`
  margin: 2% auto 0 auto;
`;
