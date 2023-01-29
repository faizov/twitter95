import React, { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";

import {
  AppBar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  TextInput,
  Toolbar,
} from "react95";
import { removeCredentials } from "../../__data__/auth/authSliced";

export function FooterMenu() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <AppBar position="fixed" style={{ bottom: 0, top: "auto", right: "auto", maxWidth: "900px" }}>
      <Toolbar style={{ justifyContent: "space-between" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <Button
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: "bold" }}
          >
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/56ddcf59-3cb4-4f3d-851e-91ec86e67871/df9xsr3-755ae779-c8b0-4dd1-b8d8-32fedd0a5286.png/v1/fill/w_192,h_192,strp/twitter_pixel_logo_for_personal_portfolio_by_panfrieddupa_df9xsr3-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTkyIiwicGF0aCI6IlwvZlwvNTZkZGNmNTktM2NiNC00ZjNkLTg1MWUtOTFlYzg2ZTY3ODcxXC9kZjl4c3IzLTc1NWFlNzc5LWM4YjAtNGRkMS1iOGQ4LTMyZmVkZDBhNTI4Ni5wbmciLCJ3aWR0aCI6Ijw9MTkyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Z7T8P2X4l4jF40Kd1pwZFGWwxJYQREkyPsUq7DSL07k"
              alt="twitter95 logo"
              style={{ height: "20px", marginRight: 4 }}
            />
            Start
          </Button>
          {open && (
            <MenuList
              style={{
                position: "absolute",
                left: "0",
                top: "auto",
                bottom: 40,
              }}
              onClick={() => setOpen(false)}
            >
              <Link href={"/"}>
                <MenuListItem>
                  <span role="img" aria-label="📝">
                    📝
                  </span>
                  Tweets
                </MenuListItem>
                <MenuListItem>
                  <span role="img" aria-label="👨‍💻">
                    👨‍💻
                  </span>
                  Profile
                </MenuListItem>
              </Link>
              <Separator />
              <MenuListItem onClick={() => dispatch(removeCredentials())}>
                <span role="img" aria-label="🔙">
                  🔙
                </span>
                Logout
              </MenuListItem>
            </MenuList>
          )}
        </div>

        <TextInput placeholder="Search..." width={150} />
      </Toolbar>
    </AppBar>
  );
}
