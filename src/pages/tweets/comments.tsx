import Link from "next/link";
import React, { useState } from "react";
import { Avatar } from "../../components/customs";
import { Button, TextInput } from "react95";
import {
  useAddCommentMutation,
  useGetCommentsQuery,
} from "../../__data__/tweetsApi";
import { UserData } from "../../__data__/auth/authApi";
import { Input } from "../../components/input";

type Props = {
  id: string | string[] | undefined;
  user: UserData | null;
};

export const Comments = ({ id, user }: Props) => {
  const [sendComment] = useAddCommentMutation();
  const { data: allComments } = useGetCommentsQuery(String(id), { skip: !id });
  const [input, setInput] = useState("");

  const clickSendComment = async () => {
    if (user) {
      const body = {
        tweetId: id,
        authorId: user._id,
        text: input,
      };
      await sendComment(body);
      setInput("");
    }
  };

  return (
    <>
      <div style={{ margin: "50px 0" }}>
        {/* <TextInput
          multiline
          rows={4}
          defaultValue={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
        /> */}

        <Input
          state={input}
          setState={setInput}
          multiline
          rows={3}
          fullWidth
          placeholder="Tweet your reply!"
          maxLength={280}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            position: "relative",
          }}
        >
          <div>
            <Button disabled={!input} onClick={() => clickSendComment()}>
              Reply
            </Button>
          </div>
        </div>

        {/* <Button onClick={() => clickSendComment()} style={{ margin: "10px 0" }}>
          Reply
        </Button> */}
      </div>

      {allComments &&
        allComments.map((data) => {
          return (
            <div style={{ margin: "20px 0" }}>
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex" }}>
                  <Link href={`/profile/${data.author.id}`}>
                    <Avatar url={data.author.avatar} noBorder={false} />
                  </Link>
                  <div>
                    <div>{data.author.name}</div>
                    <div>{data.text}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};
