import styled from "styled-components";

export const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MenuStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuItemStyle = styled.div`
  display: flex;
  justify-content: center;
  max-width: 350px;
  align-items: center;
  margin: auto;
`;

export const ItemPhoto = styled.img`
  content: url(${(props) => props.photo});
  height: 50%;
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
`;
