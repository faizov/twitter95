import React, { useState, useEffect } from "react";
import { Button, Window, WindowContent, WindowHeader } from "react95";
import { useDispatch } from "react-redux";
import Router, { useRouter } from "next/router";

import jwt_decode from "jwt-decode";

import { setCredentials } from "../../__data__/auth/authSliced";

const Auth = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const { token } = router.query;

  const loginGoogle = async () => {
    try {
      window.open("http://localhost:3001/auth/google", "_self");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Window style={{ width: 550 }}>
        <WindowHeader>authorization.exe</WindowHeader>
        <WindowContent>
          <Button onClick={() => loginGoogle()}>Google</Button>
        </WindowContent>
      </Window>
    </div>
  );
};

export default Auth;
