import styled from "styled-components";

export const CartStyle = styled.div`
  width: 100%;
`;

export const TextStyle = styled.h1`
  text-align: center;
  font-family: Helvetica;
  font-weight: bold;
  padding-top: 1.2rem;
  color: black;
`;

export const RestaurantText = styled.div`
  font-size: 2rem;
  padding-left: 10%;
  font-family: Helvetica;
  line-height: 94px;
  padding-top: 0.5rem;
  color: #91091e;
`;

export const HeaderRow = styled.tr`
  font-size: 2rem;
  font-family: Helvetica;
  text-align: center;
  font-weight: bold;
  color: black;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: row;
`;

export const ItemRow = styled.tr`
  display: flex;
  flex-direction: row;
  font-size: 1.5rem;
  font-family: Helvetica;
  text-align: center;
  font-weight: bold;
  color: black;
  padding-top: 0.5rem;
  align-items: center;
`;

export const ItemNameHeader = styled.tr`
  width: 30%;
  margin-left: 7vw;
`;
export const ItemName = styled.tr`
  width: 30%;
`;

export const ItemPrice = styled.tr`
  width: 20%;
`;
export const ItemQuantity = styled.tr`
  width: 15%;
`;

export const ItemTotal = styled.tr`
  margin-left: auto;
  text-align: end;
  width: 15%;
`;

export const AddButton = styled.div`
  margin-left: 2%;
  margin-right: 2.5%;
  border-radius: 50%;
  background-color: #91091e;
  color: white;
  font-size: 2.5rem;
  width: 3.5rem;
  cursor: pointer;
`;
export const RemoveButton = styled.div`
  border-radius: 50%;
  background-color: #91091e;
  color: white;
  font-size: 3.4rem;
  padding: 0 7px 6px 5px;
  line-height: 1;
  width: 3.5rem;
  cursor: pointer;
`;

export const OrderTotalStyle = styled.div`
  color: #91091e;
  font-size: 1.5rem;
  margin-left: auto;
  width: fit-content;
  padding: 12px 5% 20px 5%;
  font-weight: bold;
`;

export const OrderButton = styled.div`
  background-color: #91091e;
  cursor: pointer;
  border-radius: 50px;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 12px 5% 12px 5%;
  color: white;
  margin-left: auto;
  width: fit-content;
`;

export const ItemImg = styled.div`
  content: url(${(props) => props.src});
  border-radius: 50px;
  width: 7vw;
  height: 8vh;
`;
