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
  display: grid;
  grid-auto-flow: column;
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
  font-weight: 600;
  max-width: 350px;
`;
