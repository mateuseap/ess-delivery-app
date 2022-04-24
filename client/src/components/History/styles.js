import styled from "styled-components";

import { StyledButton } from "../../utils/styles";
import { DEFAULT_RED, LIGHT_RED, DARK_RED } from "../App/App.style";

export const MainButton = styled(StyledButton)`
  width: 200px;
  font-size: 20px;
  white-space: nowrap;
  padding: 12px 6% 12px 6%;
  display: inline-block;
  font-weight: normal;
`;

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
  display: flex;
  justify-content: space-between;
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

export const TableDataStyle = styled.div`
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
  width: 22vw;
  color: white;
  padding: 0px 10px 0px 10px;
  text-align: center;
  background: ${LIGHT_RED};
  border-radius: 63px;
  font-size: 2rem;
  line-height: 1.5rem;
`;

export const RectangleFilter = styled.div`
  width: 230px;
  height: 60px;
  display: flex;
  gap: 8%;
  padding: 12px;

  color: white;
  font-weight: 400;
  font-size: 16px;

  justify-content: center;
  align-items: center;

  background: ${DEFAULT_RED};
  border-radius: 100px;
`;

export const RectangleDaysFilter = styled(RectangleFilter)`
  width: fit-content;
  height: 40px;

  background: ${LIGHT_RED};
  border-radius: 63px;
`;

export const SelectStyle = styled.select`
  padding: 0 1px;
  background: transparent;
  cursor: pointer;
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

export const CirclesStyle = styled(StyledButton)`
  padding: 0;
  width: 40px;
  font-size: 16px;
  height: 40px;
  display: inline-block;
  background: ${LIGHT_RED};
  border-radius: 50%;
  &:hover {
    border: 1px solid yellow;
    background-color: ${DARK_RED};
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
