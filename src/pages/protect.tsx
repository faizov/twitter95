import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import { Frame } from "react95";
import styled from "styled-components";
import localFont from "@next/font/local";

import { selectCurrentUser } from "../__data__/auth/authSliced";

import { LeftMenu } from "../components/left-menu";
import { RightMenu } from "../components/right-menu";
import Auth from "./auth";
import { useAuth } from "../hooks/useAuth";

const fonts = localFont({
  src: [
    {
      path: "../fonts/ms_sans_serif.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/ms_sans_serif_bold.woff2",
      weight: "bold",
      style: "normal",
    },
  ],
});

const FrameStyles = styled(Frame)`
  background: ${({ theme }) => theme.desktopBackground};
  width: 100%;
  min-height: 100vh;
  border: 0;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  min-width: 800px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
`;

export const FrameStyled = styled(Frame)`
  min-width: 600px;
  max-width: 600px;
  padding: 15px;
`;

export const Protect = ({ children }: any) => {
  const selectUser = useSelector(selectCurrentUser);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  return loading ? (
    <FrameStyles variant="window"></FrameStyles>
  ) : (
    <FrameStyles variant="window">
      {selectUser ? (
        <div className={fonts.className}>
          <Wrapper>
            <LeftMenu />
            <FrameStyled variant="inside">{children}</FrameStyled>
            <RightMenu />
          </Wrapper>
        </div>
      ) : (
        <Auth />
      )}
    </FrameStyles>
  );
};
