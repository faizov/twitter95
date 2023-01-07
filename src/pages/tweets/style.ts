import styled from "styled-components";

export const TweetHeaed = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  button {
    min-width: 56px;
    margin-right: 56px;
  }
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

export const TweetPostInfoAuthor = styled.div`
  margin-bottom: 10px;
  width: 100%;

  span {
    color: rgb(83, 100, 113);
    font-size: 15px;
  }
`;

export const TweetPostInfoText = styled.div`
  p {
    margin-bottom: 20px;
  }
`;

export const TweetPostAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    color: rgb(83, 100, 113);
  }
`;
