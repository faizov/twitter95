import { MenuList, MenuListItem, Button, Avatar } from "react95";
import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 275px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: sticky;
  top: 0;
  height: 100vh;
`;

export const MenuListStyle = styled(MenuList)`
  height: 100%;
`;

export const ButtonTweet = styled(Button)`
  margin-top: 30px;
`;

export const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 15px 15px 15px 0;
  cursor: pointer;
`;

export const ProfileInfo = styled.div`
  display: flex;

`;
