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
  TweetPostInfo,
  TweetPostInfoAuthor,
  TweetPostInfoText,
  TweetPostAction,
} from "./style";
import { useAuth } from "../../hooks/useAuth";

const Tweet = () => {
  const router = useRouter();
  const { id } = router.query;
  const result = useGetTweetQuery(Number(id));
  const { data, isLoading } = result;

  const auth = useAuth();
  const { user } = auth;

  const [likeTweet] = useLikeTweetMutation();

  if (!data || isLoading) {
    return <div>Loading</div>;
  }

  const onClickLike = async () => {
    await likeTweet(Number(id));
  };

  const lines = data.text?.split("\n");
  let numBreaks = 0;

  return (
    <>
      <TweetHeaed onClick={() => router.back()}>
        <Button square variant="thin">
          <span role="img" aria-label="recycle">
            &#8592;
          </span>
        </Button>
        Tweet
      </TweetHeaed>
      <TweetPostBlock>
        <TweetPost>
          <Link href={`/profile/${data.authorId}`}>
            <Avatar url={"http://localhost:3001/avatars/" + data.authorId +".png"} noBorder={false} />
          </Link>
          <TweetPostInfo>
            <Link href={`/profile/${data.authorId}`}>
              <TweetPostInfoAuthor>
                <p>{data.name}</p>
                <span>@{data.nickname}</span>
              </TweetPostInfoAuthor>
            </Link>

            <TweetPostInfoText>
              {lines?.map((line, index) => {
                if (line === "") {
                  numBreaks++;
                } else {
                  numBreaks = 0;
                }
                return (
                  <React.Fragment key={index}>
                    {line}
                    {index < lines.length - 1 && numBreaks < 3 && <br />}
                  </React.Fragment>
                );
              })}
            </TweetPostInfoText>
            <TweetPostAction>
              <span>{data.date}</span>
              <Button onClick={() => onClickLike()}>Like {data.likes}</Button>
            </TweetPostAction>
          </TweetPostInfo>
        </TweetPost>
      </TweetPostBlock>
    </>
  );
};

export default Tweet;
