import React, { useState } from "react";
import { Frame, Button, TextInput, Separator } from "react95";
import styled from "styled-components";

import { Avatar } from "../customs";

import {
  FrameStyled,
  HomeBlock,
  TweetBlock,
  TweetButtonBlock,
  TweetPostBlock,
  TweetPost,
  TweetPostInfo,
} from "./style";

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
    <FrameStyled variant="inside">
      <HomeBlock>
        <h2>Home</h2>
      </HomeBlock>

      <TweetBlock>
        <Avatar url="https://placekitten.com/100/100" />
        <TextInput
          multiline
          variant="flat"
          rows={3}
          placeholder="What's happening?"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          fullWidth
        />
      </TweetBlock>
      <TweetButtonBlock>
        <Button primary size="sm" disabled={!input}>
          Tweet
        </Button>
      </TweetButtonBlock>

      <div>
        {JsonPosts.map((item) => {
          return (
            <TweetPostBlock key={item.id}>
              <Separator />
              <TweetPost>
                <Avatar url={item.avatar} noBorder={false} />
                <div>
                  <TweetPostInfo>
                    <p>{item.name}</p>
                    <span>{item.nickname}</span>
                    <span>&#8226;</span>
                    <span>4ч</span>
                  </TweetPostInfo>
                  <p>{item.text}</p>
                </div>
              </TweetPost>
            </TweetPostBlock>
          );
        })}
      </div>
    </FrameStyled>
  );
};
