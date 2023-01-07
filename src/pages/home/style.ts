import { Frame } from "react95";
import styled from "styled-components";

export const FrameStyled = styled(Frame)`
  min-width: 600px;
  max-width: 600px;
  padding: 15px;
`;

export const HomeBlock = styled.div`
  height: 30px;
  position: sticky;
  top: 0;
  background: #c6c6c6;
  padding: 10px 0px;
  z-index: 1;
`;

export const TweetBlock = styled.div`
  display: flex;
  align-items: flex-start;
`;

export const TweetButtonBlock = styled.div`
  display: flex;
  justify-content: end;
  padding: 12px 0px;
`;

export const TweetPostBlock = styled.div`
  margin-top: 15px;
`;

export const TweetPost = styled.div`
  display: flex;
  margin-top: 15px;
  align-items: start;
  word-break: break-word;
`;

export const TweetPostInfo = styled.div`
  display: flex;
  margin-top: 10px;

  p,
  span {
    margin-right: 5px;
  }
`;

