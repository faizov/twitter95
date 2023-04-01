import React, { useState, useEffect, useRef } from "react";
import { Button, TextInput, Separator, Hourglass } from "react95";
import Link from "next/link";

import {
  useGetTweetsQuery,
  useAddTweetMutation,
} from "../../__data__/tweetsApi";

import { Avatar } from "../../components/customs";

import {
  FrameStyled,
  HomeBlock,
  TweetBlock,
  TweetButtonBlock,
  TweetPostBlock,
  TweetPost,
  TweetPostInfo,
} from "./style";
import { useAuth } from "../../hooks/useAuth";
import Tweet from "../../components/tweets";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Input } from "../../components/input";

export const Content = () => {
  const result = useGetTweetsQuery();
  const { data } = result;

  const auth = useAuth();
  const { user } = auth;

  const [input, setInput] = useState("");
  let countInput = 280 - input.length;

  const [addTweet, { isLoading }] = useAddTweetMutation();

  const addTweetClick = async () => {
    if (input.length > 280) {
      return <>Error</>;
    }
    try {
      if (user) {
        const body = {
          name: user.name,
          avatar: user.avatar,
          nickname: "YuriyF",
          text: input,
        };
        setInput("");
        await addTweet(body);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("isLoading", isLoading);
  return (
    <>
      <HomeBlock>
        <h2>Home</h2>
      </HomeBlock>

      <TweetBlock>
        <Avatar url={user?.avatar ?? ""} />

        <Input
          multiline
          variant="flat"
          rows={3}
          placeholder="What's happening?"
          setState={setInput}
          state={input}
          fullWidth
        />
      </TweetBlock>

      <TweetButtonBlock>
        <div className="button">
          <span>{countInput}</span>

          {!isLoading ? (
            <Button
              primary
              size="sm"
              disabled={!input || isLoading}
              onClick={() => addTweetClick()}
            >
              Tweet
            </Button>
          ) : (
            <Hourglass size={20} />
          )}
        </div>
      </TweetButtonBlock>

      <div>
        {data?.map((item) => {
          return <Tweet item={item} key={item._id} />;
        })}
      </div>
    </>
  );
};
