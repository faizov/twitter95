import React, { useState, useEffect } from "react";
import { Button, TextInput, Separator } from "react95";
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

export const Content = () => {
  const result = useGetTweetsQuery();
  const { isLoading, error, data } = result;

  const auth = useAuth();
  const { user } = auth;

  const [input, setInput] = useState("");
  let countInput = 280 - input.length;

  const [addTweet, { isLoading: isLoadingAdd }] = useAddTweetMutation();

  const addTweetClick = async () => {
    if (input.length > 280) {
      return <>Error</>;
    }
    try {
      if (user) {
        const body = {
          name: user.name,
          avatar: user.photo,
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

  console.log("data", data);

  return (
    <>
      <HomeBlock>
        <h2>Home</h2>
      </HomeBlock>

      <TweetBlock>
        <Avatar url={user?.photo ?? ""} />
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
        <span>{countInput}</span>

        <Button
          primary
          size="sm"
          disabled={!input}
          onClick={() => addTweetClick()}
        >
          Tweet
        </Button>
      </TweetButtonBlock>

      <div>
        {data?.map((item) => {
          return <Tweet item={item} key={item._id} />;
        })}
      </div>
    </>
  );
};
