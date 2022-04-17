import styled from "styled-components";

export const Box = styled.div`
  background: rgba(159, 180, 255, 0.35);
  padding-top: 20px;
  position: absolute;
  left: 0;
  right: 0;
  color: #22577e;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Column = styled.div`
  display: flex;
  text-align: center;
  margin: 0 auto;
`;

export const Name = styled.p`
  font-size: 17px;
  font-weight: 450;
`;

export const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterLink = styled.a`
  color: #22577e;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;

  &:hover {
    color: #e83a14;
    transition: 200ms ease-in;
  }
`;

export const Heading = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
  font-weight: bold;
  text-align: center;
`;
