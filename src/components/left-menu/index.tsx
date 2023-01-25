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
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/800px-Twitter-logo.svg.png"
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
