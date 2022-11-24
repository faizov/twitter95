import React, { useState } from "react";
import { Frame, TextInput } from "react95";
import styled from "styled-components";

export const RightMenu = () => {
  const [inputSearch, setInputSeatch] = useState("");
  return (
    <Frame
      variant="inside"
      style={{
        minWidth: 350,
      }}
    >
      <div
        style={{
          padding: 15,
          position: "sticky",
          top: 0,
          background: "#c6c6c6",
        }}
      >
        <TextInput
          value={inputSearch}
          onChange={(e) => setInputSeatch(e.target.value)}
          placeholder="Search Twitter95"
          fullWidth
        />
      </div>
    </Frame>
  );
};
