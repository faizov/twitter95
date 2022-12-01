import React, { useState } from "react";
import { MenuList, MenuListItem, Button, Avatar } from "react95";
import styled from "styled-components";

import { List } from "./config";

import {
  Wrapper,
  MenuListStyle,
  ButtonTweet,
  Profile,
  ProfileInfo,
} from "./style";

import Link from "next/link";

export const LeftMenu = () => {
  const [open, setOpen] = useState(false);

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
          <Avatar
            size={48}
            src="https://sun9-34.userapi.com/impg/D1QEdA_0uINV_egDZDRcfQJaY9_1ZJMTLIaWiA/TFxJqXvtEuU.jpg?size=1280x960&quality=95&sign=34f202ab6e027220f70eb1e89a267e11&type=album"
          />
          <div>
            <h3>Yuriy F.</h3>
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
              onClick={() => setOpen(false)}
            >
              <MenuListItem size="sm">Log out @FaizovYuriy</MenuListItem>
            </MenuList>
          )}
        </div>
      </Profile>
    </Wrapper>
  );
};
