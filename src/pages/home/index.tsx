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

export const Content = () => {
  const result = useGetTweetsQuery();
  const { isLoading, error, data } = result;

  const [input, setInput] = useState("");
  const [addTweet, { isLoading: isLoadingAdd }] = useAddTweetMutation();

  const addTweetClick = async (text: string) => {
    try {
      const body = {
        name: "Yuriy Faizov",
        avatar:
          "https://sun9-82.userapi.com/impg/WmAMZn8VFvDkr2lspVxJv7735tYG38j2VwewRA/-lI97VXi-CQ.jpg?size=964x726&quality=95&sign=3b9362b1f52f05bc44e3051bc92b1677&type=album",
        nickname: "YuriyF",
        text: text,
      };
      setInput("");
      await addTweet(body).unwrap();
    } catch (error) {}
  };

  return (
    <>
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
        <Button
          primary
          size="sm"
          disabled={!input}
          onClick={() => addTweetClick(input)}
        >
          Tweet
        </Button>
      </TweetButtonBlock>

      <div>
        {data &&
          data.map((item) => {
            return (
              <Link href={`tweets/${item.id}`}>
                <TweetPostBlock key={item.id}>
                  <Separator />
                  <TweetPost>
                    <Avatar url={item.avatar} noBorder={false} />
                    <div>
                      <TweetPostInfo>
                        <p>{item.name}</p>
                        <span>{item.nickname}</span>
                        <span>&#8226;</span>
                        <span>{item.date}</span>
                      </TweetPostInfo>
                      <p>{item.text}</p>
                    </div>
                  </TweetPost>
                </TweetPostBlock>
              </Link>
            );
          })}
      </div>
    </>
  );
};
