import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Separator } from "react95";

import Avatar from "../customs/avatar";

import { TweetPost, TweetPostBlock, TweetPostInfo } from "./style";

import { Tweet } from "../../__data__/tweetsApi";
import { createHashTags } from "../../utils/createHashTags";

type TweetRespose = {
  item: Tweet;
};

const Tweet = ({ item }: TweetRespose) => {
  const [text, setText] = useState(item.text);
  const [likes, setLikes] = useState("");

  useEffect(() => {
    const likeIds = localStorage.getItem("ids");

    if (likeIds) {
      setLikes(likeIds);
    }

    const formattedText = createHashTags(item.text);

    setText(formattedText);
  }, []);

  const lines = text?.split("\n");
  let numBreaks = 0;

  return (
    <Link href={`/tweets/${item._id}`} key={item._id}>
      <TweetPostBlock key={item._id}>
        <Separator />
        <TweetPost>
          <Link href={`/profile/${item.authorId}`}>
            <Avatar
              url={"http://localhost:3001/avatars/" + item.authorId + ".png"}
              noBorder={false}
            />
          </Link>
          <div style={{ width: "100%" }}>
            <TweetPostInfo>
              <p>{item.name}</p>
              <span>&#8226;</span>
              <span>{item.date}</span>
            </TweetPostInfo>

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
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                margin: "5px 0",
              }}
            >
              {likes.includes(item._id) ? "❤️" : "💙"} {item.likes}
            </div>
          </div>
        </TweetPost>
      </TweetPostBlock>
    </Link>
  );
};
export default Tweet;
