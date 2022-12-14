import { MenuList, MenuListItem, Button, Avatar } from "react95";
import styled from "styled-components";

export const AvatarStyled = styled(Avatar)`
  overflow: inherit;
  margin-right: 15px;
  min-width: ${(props) => (props.size ? props.size : 48)}px;
  min-height: ${(props) => (props.size ? props.size : 48)}px;

  img {
    min-width: ${(props) => (props.size ? props.size : 48)}px;
    min-height: ${(props) => (props.size ? props.size : 48)}px;
    object-fit: cover;
    border-radius: 35px;
  }
`;
