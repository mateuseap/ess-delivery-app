import styled from "styled-components";

export const HomeStyle = styled.div`
<<<<<<< HEAD
  width:30%
  display:flex;
  flex-direction:column;

  li{
    padding:5px;
  }
=======
  padding: 0 10% 0 10%;
`;

export const TextStyle = styled.h1`
  text-align: center;
  font-family: Helvetica;
  line-height: 3.5rem;
  padding-top: 0.8rem;
  color: #91091e;
`;

export const CardGroup = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

export const Card = styled.div`
  background-color: rgba(245, 245, 245, 0.8);
  position: relative;
  width: 25%;
  border-radius: 50px;
  align-items: center;
`;

export const CardTitle = styled.div`
  color: #91091e;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

export const DishName = styled.div`
  margin-bottom: 1rem;
  color: #1b1a17;
`;

export const DishDescription = styled.div`
  color: #05595b;
  text-align: justify;
  line-height: 1.35rem;
  letter-spacing: 1.35px;
`;

export const CardBody = styled.div`
  padding: 1rem;
  text-align: center;
`;

export const DishImg = styled.div`
  content: url(${(props) => props.src});
  border-radius: 50px;
  width: 100%;
  height: 12vw;
`;

export const BtnStyle = styled.div`
  position: absolute;
  bottom: 0;
  left: calc(15% + 3vw);
>>>>>>> fixDesenvolvimento
`;
