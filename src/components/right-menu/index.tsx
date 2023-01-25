import React, { useState } from "react";
import { Frame, TextInput } from "react95";

import { FrameStyled, SearchBlock } from "./style";

export const RightMenu = () => {
  const [inputSearch, setInputSeatch] = useState("");
  return (
    <FrameStyled variant="inside">
      <SearchBlock>
        <TextInput
          value={inputSearch}
          onChange={(e) => setInputSeatch(e.target.value)}
          placeholder="Search Twitter95"
          fullWidth
        />
      </SearchBlock>

      <div style={{ padding: 15, width: "100%", position: "sticky", top: 70 }}>
        <img
          width={"100%"}
          src="https://www.meme-arsenal.com/memes/66c9a6b1ce6b6226ef697ef7ea99ebdf.jpg"
          alt=""
        />
      </div>
    </FrameStyled>
  );
};
