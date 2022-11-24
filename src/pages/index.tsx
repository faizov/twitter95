import React from "react";
import styled from "styled-components";

import { LeftMenu } from "../components/home/leftMenu";
import { RightMenu } from "../components/home/rightMenu";
import { Content } from "../components/home/content";

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
