import styled from "styled-components";

export const ImageStyle = styled.img`
  width: 234px;
  height: 170px;
  border-radius: 65px;
  content: url(${(props) => props.photoUrl});
`;

export const DisabledSendButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const DescriptionStyle = styled.div`
  display: grid;
  width: 200px;
  grid-auto-flow: row;
  grid-column-gap: 4vw;
`;

export const ActionButtonsStyle = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 15vw;
`;

export const RateLabel = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 5em;
  min-width: 30vw;
  font-size: 40px;
  line-height: 47px;
`;

export const MainDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10vw;
`;

export const TableBodyStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const PageStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BorderText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vw;
  color: white;
  line-height: 70px;
  font-weight: 400;
  text-align: center;
  background: rgba(250, 16, 52, 0.82);
  border-radius: 63px;
`;

export const RectangleFilter = styled.div`
  width: 230px;
  height: 60px;
  display: flex;
  gap: 10%;
  padding: 12px;

  color: white;
  font-weight: 400;
  font-size: 16px;
  line-height: 38px;

  justify-content: center;
  align-items: center;

  background: #91091e;
  border-radius: 100px;
`;

export const RectangleDaysFilter = styled.div`
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: rgba(250, 16, 52, 0.82);
  border-radius: 63px;
`;

export const SelectStyle = styled.select`
  background: transparent;
  line-height: 1;
  border: 0;
  color: white;
  border-radius: 63px;
  text-align: center;
  height: 100%;
  width: 100%;
  -webkit-appearance: none;
`;

export const TopDiv = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 10vw;
`;

export const ButtonStyle = styled.button`
  all: unset;
  cursor: pointer;
  width: 40px;
  height: 40px;
  text-align: center;
  background: rgba(250, 16, 52, 0.82);
  border-radius: 63px;
  box-sizing: border-box;
  &:hover {
    border: 1px solid yellow;
    background-color: rgba(250, 16, 52, 0.2);
  }
`;

export const NoDataStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  top: 45%;
  left: 0;
  right: 0;
  margin: auto;
`;

export const OptionStyle = styled.option`
  color: black;
`;
