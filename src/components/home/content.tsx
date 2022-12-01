import React, { useState } from "react";
import { Frame, Button, TextInput, Avatar, Separator } from "react95";
import styled from "styled-components";
import { LeftMenu } from "../../components/home/leftMenu";
const JsonPosts = [
  {
    id: 1,
    avatar: "https://placekitten.com/100/100",
    name: "Yuriy Faizov",
    nickname: "@faizov",
    text: "321 trest",
  },
  {
    id: 2,
    avatar:
      "https://sun9-34.userapi.com/impg/D1QEdA_0uINV_egDZDRcfQJaY9_1ZJMTLIaWiA/TFxJqXvtEuU.jpg?size=1280x960&quality=95&sign=34f202ab6e027220f70eb1e89a267e11&type=album",
    name: "Yuriy Faizov",
    nickname: "@faizov",
    text: "texttexttexttexttexttextttexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttex texttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttex texttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttex texttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttex texttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttextexttexttexttexttexttexttexttexttexttex",
  },
  {
    id: 3,
    avatar:
      "https://sun9-82.userapi.com/impf/c850728/v850728240/97bea/b4W__CgjwcI.jpg?size=762x316&quality=96&sign=1e328f3d63295549f2defe81087ebe10&type=album",
    name: "Yuriy F.",
    nickname: "@yuriy",
    text: "Tweet wow! ",
  },
  {
    id: 4,
    avatar:
      "https://sun9-82.userapi.com/impf/c850728/v850728240/97bea/b4W__CgjwcI.jpg?size=762x316&quality=96&sign=1e328f3d63295549f2defe81087ebe10&type=album",
    name: "Yuriy F.",
    nickname: "@yuriy",
    text: "Tweet wow! ",
  },
  {
    id: 5,
    avatar:
      "https://sun9-82.userapi.com/impf/c850728/v850728240/97bea/b4W__CgjwcI.jpg?size=762x316&quality=96&sign=1e328f3d63295549f2defe81087ebe10&type=album",
    name: "Yuriy F.",
    nickname: "@yuriy",
    text: "Tweet wow! ",
  },
  {
    id: 6,
    avatar:
      "https://sun9-82.userapi.com/impf/c850728/v850728240/97bea/b4W__CgjwcI.jpg?size=762x316&quality=96&sign=1e328f3d63295549f2defe81087ebe10&type=album",
    name: "Yuriy F.",
    nickname: "@yuriy",
    text: "Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! Tweet wow! ",
  },
];

export const Content = () => {
  const [input, setInput] = useState("");

  return (
    <Frame
      variant="inside"
      style={{ minWidth: 600, maxWidth: 600, padding: 15 }}
    >
      <div
        style={{
          height: 30,
          position: "sticky",
          top: 0,
          background: "#c6c6c6",
          padding: "15px 0",
        }}
      >
        <h2>Home</h2>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <Avatar
          noBorder
          size={48}
          src="https://placekitten.com/100/100"
          style={{ height: "auto", marginRight: 12 }}
        />
        <TextInput
          multiline
          variant="flat"
          rows={3}
          placeholder="What's happening?"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          fullWidth
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          padding: "12px 0",
        }}
      >
        <Button primary size="sm" disabled={!input}>
          Tweet
        </Button>
      </div>

      <div>
        {JsonPosts.map((item) => {
          return (
            <div style={{ marginTop: 15 }} key={item.id}>
              <Separator />
              <div
                style={{
                  display: "flex",
                  marginTop: 15,
                  alignItems: "start",
                  wordBreak: "break-word",
                }}
              >
                <Avatar
                  size={50}
                  src={item.avatar}
                  style={{ minWidth: 50, marginRight: 12 }}
                />
                <div>
                  <div style={{ display: "flex", marginBottom: 10 }}>
                    <p style={{ marginRight: 5 }}>{item.name}</p>
                    <span style={{ marginRight: 5 }}>{item.nickname}</span>
                    <span style={{ marginRight: 5 }}>&#8226;</span>
                    <span style={{ marginRight: 5 }}>4ч</span>
                  </div>
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
};
