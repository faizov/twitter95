import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "react95";

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

import { selectCurrentUser } from "../../__data__/auth/authSliced";

const Tweet = () => {
  const router = useRouter();
  const { id } = router.query;
  const result = useGetTweetQuery(id, { skip: !id });
  const { data, isLoading } = result;

  const [text, setText] = useState("");

  useEffect(() => {
    if (data) {
      const regex = /(#\w+)/g;
      const formattedText = data.text.replace(
        regex,
        (match: string) =>
          `<span style="color:rgb(54 128 178)">${match}</span> `
      );

      setText(formattedText);
    }
  }, [data]);

  const user = useSelector(selectCurrentUser);

  const [deleteTweet] = useDeleteTweetMutation();
  const [likeTweet] = useLikeTweetMutation();

  if (!data || isLoading) {
    return <div>Loading</div>;
  }

  const lines = text?.split("\n");
  let numBreaks = 0;

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
              {lines?.map((line: string, index: number) => {
                if (line === "") {
                  numBreaks++;
                } else {
                  numBreaks = 0;
                }
                return (
                  <React.Fragment key={index}>
                    <span dangerouslySetInnerHTML={{ __html: line }} />
                    {index < lines.length - 1 && numBreaks < 3 && <br />}
                  </React.Fragment>
                );
              })}
            </TweetPostInfoText>
            <TweetPostAction>
              <span>{data.date}</span>
              <Button onClick={() => onClickLike()}>💙 {data.likes}</Button>
            </TweetPostAction>
          </TweetPostInfo>
        </TweetPost>
      </TweetPostBlock>
    </>
  );
};

export default Tweet;
