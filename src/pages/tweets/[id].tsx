import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Window, WindowContent, WindowHeader } from "react95";

import {
  useGetTweetQuery,
  useLikeTweetMutation,
  useDeleteTweetMutation,
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
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../__data__/auth/authSliced";

const Tweet = () => {
  const router = useRouter();
  const { id } = router.query;
  const result = useGetTweetQuery(id);
  const { data, isLoading } = result;
  const user = useSelector(selectCurrentUser);

  const [deleteTweet] = useDeleteTweetMutation();
  const [likeTweet] = useLikeTweetMutation();

  if (!data || isLoading) {
    return <div>Loading</div>;
  }

  const onClickDeleteTweet = async () => {
    await deleteTweet(id)
      .unwrap()
      .then((res) => {
        if (res) {
          router.push("/");
        }
      });
  };

  const onClickLike = async () => {
    await likeTweet(id);
  };

  const lines = data.text?.split("\n");
  let numBreaks = 0;

  const AlertWindow = () => {
    return (
      <Window className="window">
        <WindowHeader active={false} className="window-title">
          <span>not-active.exe</span>
          <Button>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <WindowContent>I am not active</WindowContent>
      </Window>
    );
  };

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
            <Avatar
              url={"http://localhost:3001/avatars/" + data.authorId + ".png"}
              noBorder={false}
            />
          </Link>
          <TweetPostInfo>
            <TweetPostInfoAuthor>
              <Link href={`/profile/${data.authorId}`}>
                <div>
                  <p>{data.name}</p>
                  <span>@{data.nickname}</span>
                </div>
              </Link>
              {data.authorId === user?.id ? (
                <div>
                  <Button square onClick={() => onClickDeleteTweet()}>
                    <span role="img" aria-label="recycle">
                      ♻︎
                    </span>
                  </Button>
                </div>
              ) : null}
            </TweetPostInfoAuthor>

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

      {/* <AlertWindow /> */}
    </>
  );
};

export default Tweet;
