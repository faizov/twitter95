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
    </FrameStyled>
  );
};
