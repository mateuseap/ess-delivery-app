import styled from "styled-components";

export const OrderDetailsPage = styled.div`
  padding: 10px;
  flex-direction: column;
  align-items: center;
`;

export const OrderTitles = styled.div`
  font-weight: bold;
  color: #91091e;
  text-align: center;
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
  padding: 0.01%;
  margin: 0.3%;
  width: 300px;
  font-weight: bold;
`;

export const Restaurant = styled.div`
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
