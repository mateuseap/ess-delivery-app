import styled from "styled-components";

export const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TableStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10%;
`;

export const TableBodyStyle = styled.div`
  background-color: #ffffff;
  margin: 15px 0;
  border-radius: 65px;
  display: grid;
  grid-auto-flow: column;
  height: 285px;
  place-items: center;
`;

export const ItemPhoto = styled.img`
  content: url(${(props) => props.photo});
  height: 215px;
  width: 215px;
  border-radius: 65px;
`;

export const ItemData = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ItemDescriptionStyle = styled.p`
  font-size: 18px;
  font-weight: 400;
  max-width: 350px;
`;

export const RatingTextStyles = styled.h4`
  color: #383838;
  font-weight: 600;
  font-size: 2rem;
`;
