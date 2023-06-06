import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Hourglass } from "react95";

import {
  useGetTweetQuery,
  useLikeTweetMutation,
  useDeleteTweetMutation,
} from "../../__data__/tweetsApi";

import { Avatar } from "../../components/customs";

import {
  TweetHead,
  TweetPostBlock,
  TweetPost,
  TweetPostInfo,
  TweetPostInfoAuthor,
  TweetPostInfoText,
  TweetPostAction,
} from "./style";

import { useAuth } from "../../hooks/useAuth";
import { createHashTags } from "../../utils/createHashTags";
import { likeTweetLocal } from "../../utils/likeTweet";
import { Comments } from "./comments";

const Tweet = () => {
  const router = useRouter();
  const { id } = router.query;
  const result = useGetTweetQuery(String(id), { skip: !id });
  const { data, isLoading, isError } = result;
  const [text, setText] = useState("");
  const [likes, setLikes] = useState(0);
  const [likeMe, setLikeMe] = useState(false);

  useEffect(() => {
    if (data) {
      const formattedText = createHashTags(data.text);

      setText(formattedText);
      setLikes(data.likes);
    }

    const likeIds = localStorage.getItem("ids");
    if (likeIds && id) {
      setLikeMe(likeIds.includes(String(id)));
    }
  }, [data]);

  const { user } = useAuth();

  const [deleteTweet] = useDeleteTweetMutation();
  const [likeTweet, { isLoading: isLoadingLike }] = useLikeTweetMutation();

  const lines = text?.split("\n");
  let numBreaks = 0;

  const onClickDeleteTweet = async () => {
    await deleteTweet(String(id))
      .unwrap()
      .then((res) => {
        if (res) {
          router.push("/");
        }
      });
  };

  const onClickLike = async () => {
    await likeTweet(String(id));
    likeTweetLocal(String(id));
  };

  if (isLoading) {
    return <Hourglass size={32} />;
  }

  if (isError) {
    return router.push("/");
  }

  return (
    <>
      <TweetHead onClick={() => router.back()}>
        <Button square variant="thin">
          <span role="img" aria-label="recycle">
            &#8592;
          </span>
        </Button>
        Tweet
      </TweetHead>
      <TweetPostBlock>
        {data ? (
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
                {!isLoadingLike ? (
                  <Button
                    onClick={() => onClickLike()}
                    disabled={isLoadingLike}
                  >
                    {likeMe ? "❤️" : "💙"} {likes}
                  </Button>
                ) : (
                  <Hourglass />
                )}
              </TweetPostAction>
            </TweetPostInfo>
          </TweetPost>
        ) : null}
      </TweetPostBlock>

      <Comments id={id} user={user} />
    </>
  );
};

export default Tweet;
