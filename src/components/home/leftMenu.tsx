import React, { useState } from "react";
import { MenuList, MenuListItem, Button, Avatar } from "react95";
import styled from "styled-components";

import Link from "next/link";

export const LeftMenu = () => {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        maxWidth: 275,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        height: "100vh",
      }}
    >
      <div>
        <MenuList style={{ height: "100%" }} shadow={false} fullWidth={true}>
          <MenuListItem>
            <Link href="/">
              <img
                width={25}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/800px-Twitter-logo.svg.png"
                alt="logo"
              />
            </Link>
          </MenuListItem>

          <MenuListItem>
            <Link href="/">Home</Link>
          </MenuListItem>
          <MenuListItem disabled>
            <Link href="/">Explore</Link>
          </MenuListItem>
          <MenuListItem disabled>
            <Link href="/">Notifications</Link>
          </MenuListItem>
          <MenuListItem disabled>
            <Link href="/">Messages</Link>
          </MenuListItem>
          <MenuListItem disabled>
            <Link href="/">Bookmarks</Link>
          </MenuListItem>
          <MenuListItem disabled>
            <Link href="/">Lists</Link>
          </MenuListItem>
          <MenuListItem disabled>
            <Link href="/">Profile</Link>
          </MenuListItem>
          <MenuListItem disabled>More</MenuListItem>
          <div style={{ marginTop: 30 }}>
            <Button primary size="lg" fullWidth={true}>
              Tweet
            </Button>
          </div>
        </MenuList>
      </div>

      <div
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          padding: "15px 15px 15px 0",
          cursor: "pointer",
        }}
      >
        <div style={{ display: "flex" }}>
          <Avatar
            noBorder
            size={48}
            src="https://sun9-34.userapi.com/impg/D1QEdA_0uINV_egDZDRcfQJaY9_1ZJMTLIaWiA/TFxJqXvtEuU.jpg?size=1280x960&quality=95&sign=34f202ab6e027220f70eb1e89a267e11&type=album"
            style={{ height: "auto", marginRight: 12 }}
          />
          <div>
            <h3>Yuriy F.</h3>
            <p>@faizov</p>
          </div>
        </div>
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
      </div>
    </div>
  );
};
