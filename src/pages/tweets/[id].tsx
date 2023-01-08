import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "react95";

import {
  useGetTweetQuery,
  useLikeTweetMutation,
} from "../../__data__/tweetsApi";

import { Avatar } from "../../components/customs";

import {
  TweetHeaed,
  TweetPostBlock,
  TweetPost,
  TweetPostInfoAuthor,
  TweetPostInfoText,
  TweetPostAction,
} from "./style";

const Tweet = () => {
  const router = useRouter();
  const { id } = router.query;
  const result = useGetTweetQuery(Number(id));
  const { data } = result;

  const [likeTweet] = useLikeTweetMutation();

  if (!data) {
    return <>No Tweet</>;
  }

  const onClickLike = async () => {
    await likeTweet(Number(id));
  };

  return (
    <>
      <TweetHeaed>
        <Link href={`/`}>
          <Button square variant="thin">
            <span role="img" aria-label="recycle">
              &#8592;
            </span>
          </Button>
        </Link>
        Tweet
      </TweetHeaed>
      <TweetPostBlock>
        <TweetPost>
          <Avatar url={data.avatar} noBorder={false} />
          <div>
            <TweetPostInfoAuthor>
              <p>{data.name}</p>
              <span>@{data.nickname}</span>
            </TweetPostInfoAuthor>

            <TweetPostInfoText>
              <p>{data.text}</p>
            </TweetPostInfoText>
            <TweetPostAction>
              <span>{data.date}</span>
              <Button onClick={() => onClickLike()}>Like {data.likes}</Button>
            </TweetPostAction>
          </div>
        </TweetPost>
      </TweetPostBlock>
    </>
  );
};

export default Tweet;
