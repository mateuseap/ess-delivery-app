import styled from "styled-components";

export const HeaderStyle = styled.div`
  margin-top: 1%;
  background: #91091e;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 100px;
`;

export const Title = styled.div`
  color: white;
  font-size: 3em;
  line-height: 70px;
  left: auto;
  margin-left: 2%;
`;
export const Buttons = styled.div`
  display: flex;
  space-between: 8%;
  margin: 0.5% 1% 0.5% auto;
  * {
    margin-top: auto;
    margin-bottom: auto;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

export const UserBg = styled.div`
  display: flex;
  width: 135px;
  height: 135px;
  background: #fffbfb;
  border-radius: 100px;
  align-items: center;
  padding: 0;
`;

export const UserPhoto = styled.div`
  content: url(${(props) => props.photoUrl});
  margin: auto;
  width: 130px;
  border-radius: 50%;
`;
