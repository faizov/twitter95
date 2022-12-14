import React from "react";
import styled from "styled-components";

import { LeftMenu } from "../components/left-menu";
import { RightMenu } from "../components/right-menu";
import { Content } from "../components/content";

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 800px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
`;

export default function Home() {
  return (
    <Wrapper>
      <LeftMenu />
      <Content />
      <RightMenu />
    </Wrapper>
  );
}
