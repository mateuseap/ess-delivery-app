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
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 65px;
  display: grid;
  grid-auto-flow: column;
  height: 25%;
  place-items: center;
`;

export const ItemPhoto = styled.img`
  content: url(${(props) => props.photo});
  height: 200px;
  width: 200px;
  border-radius: 65px;
`;

export const ItemData = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  padding: 1em;
`;

export const ItemDescriptionStyle = styled.p`
  font-size: 18px;
  font-weight: 400;
  max-width: 350px;
`;

export const RestaurantRating = styled.div`
  display: flex;
`;

export const RatingTextStyles = styled.h4`
  color: #ffd700;
  font-weight: 600;
  font-size: 2rem;
`;
