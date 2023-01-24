import React from "react";

import { AvatarStyled } from "./style";

type TAvatar = {
  url: string | undefined;
  noBorder?: boolean;
  size?: number;
};

const Avatar = ({ url, noBorder, size }: TAvatar) => {
  return (
    <AvatarStyled
      size={size}
      noBorder={noBorder}
      src={`${url}` ?? ""}
    />
  );
};

export default Avatar;
