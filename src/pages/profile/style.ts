import styled from "styled-components";

export const Wrapper = styled.div`
  .profile-header {
    display: flex;
    justify-content: space-between;
  }
`;

export const TweetHeaed = styled.div`
  position: sticky;
  height: 64px;
  background: #c6c6c6;
  z-index: 1;
  top: 0;
  display: flex;
  align-items: center;
  margin-bottom: 32px;

  button {
    min-width: 56px;
    margin-right: 16px;
  }
`;
