import styled from "styled-components";

export const OrderDetailsPage = styled.div`
  padding: 10px;
  flex-direction: column;
  align-items: center;
`;

export const OrderTitles = styled.h1`
  font-weight: bold;
  color: #91091e;
  text-align: center;
  margin-top: 20px; 
`;

export const OrderStatus = styled.div`
  align-items: center;
  height: 170px;
  padding-top: 0.5%;
  display: flex;
  flex-direction: column;
`;

export const OrderStatusItem = styled.div`
  text-align: center;
  color: white;
  flex-direction: row;
  background-color: #91091e;
  border-radius: 100px;
  width: 20vw;
  font-weight: bold;
  margin: 3px;
  padding: 5px;

`;

export const Restaurant = styled.h4`
  font-weight: bold;
  color: #91091e;
  display: flex;
  align-items: left;
`;

export const OrderItem = styled.div`
  height: 30px;
  font-size: 20px;
  position: absolute;
  font-weight: bold;
`;

export const OrderItemPrice = styled.div`
  height: 30px;
  font-size: 20px;
  position: relative;
  text-align: right;
  font-weight: bold;
`;

export const TotalPrice = styled.div`
  height: 30px;
  font-size: 25px;
  color: #91091e;
  position: relative;
  text-align: right;
  font-weight: bold;
`;

export const Deliver = styled.div`
  margin-top: 3%;
  height: 30px;
  color: #91091e;
  font-size: 20px;
  position: absolute;
  font-weight: bold;
  margin-bottom: 2%;
`;

export const ButtonRight = styled.div`
  margin-top: 3%;
  height: 30px;
  font-size: 25px;
  color: #91091e;
  position: relative;
  text-align: right;
  font-weight: bold;
  margin-bottom: 2%;
`;
