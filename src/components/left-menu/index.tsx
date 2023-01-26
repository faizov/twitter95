import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MenuList, MenuListItem } from "react95";

import {
  removeCredentials,
  selectCurrentUser,
} from "../../__data__/auth/authSliced";

import { Avatar } from "../customs";
import { List } from "./config";

import {
  Wrapper,
  MenuListStyle,
  ButtonTweet,
  Profile,
  ProfileInfo,
} from "./style";

import Link from "next/link";
import { useAuth } from "../../hooks/useAuth";

export const LeftMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [open, setOpen] = useState(false);

  const logoutClick = () => {
    dispatch(removeCredentials());
  };

  return (
    <Wrapper>
      <div>
        <MenuListStyle shadow={false} fullWidth={true}>
          <Link href="/">
            <MenuListItem>
              <img
                width={25}
                src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/56ddcf59-3cb4-4f3d-851e-91ec86e67871/df9xsr3-755ae779-c8b0-4dd1-b8d8-32fedd0a5286.png/v1/fill/w_192,h_192,strp/twitter_pixel_logo_for_personal_portfolio_by_panfrieddupa_df9xsr3-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyIiwicGF0aCI6IlwvZlwvNTZkZGNmNTktM2NiNC00ZjNkLTg1MWUtOTFlYzg2ZTY3ODcxXC9kZjl4c3IzLTc1NWFlNzc5LWM4YjAtNGRkMS1iOGQ4LTMyZmVkZDBhNTI4Ni5wbmciLCJ3aWR0aCI6Ijw9MTkyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Z7T8P2X4l4jF40Kd1pwZFGWwxJYQREkyPsUq7DSL07k"
                alt="logo"
              />
            </MenuListItem>
          </Link>
          {List.map((item) => {
            return (
              <Link href={item.disabled ? "#" : item.link} key={item.label}>
                <MenuListItem disabled={item.disabled}>
                  {item.label}
                </MenuListItem>
              </Link>
            );
          })}

          <ButtonTweet primary size="lg" fullWidth={true}>
            Tweet
          </ButtonTweet>
        </MenuListStyle>
      </div>

      <Profile onClick={() => setOpen(!open)}>
        <ProfileInfo>
          <Avatar url={user?.photo} />
          <div>
            <h3>{user?.name}</h3>
            <p>@faizov</p>
          </div>
        </ProfileInfo>
        <div>
          <p>...</p>
          {open && (
            <MenuList
              style={{
                position: "absolute",
                bottom: "100%",
                right: "0",
              }}
            >
              <MenuListItem size="sm" onClick={() => logoutClick()}>
                Log out {user?.name}
              </MenuListItem>
            </MenuList>
          )}
        </div>
      </Profile>
    </Wrapper>
  );
};
