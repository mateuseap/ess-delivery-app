import styled from "styled-components";

export const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ItemPhoto = styled.img`
  content: url(${(props) => props.photo});
  margin: auto;
  width: 110px;
  border-radius: 50%;
`;
