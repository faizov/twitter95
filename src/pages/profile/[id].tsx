import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Separator } from "react95";
import { Avatar } from "../../components/customs";
import { useAuth } from "../../hooks/useAuth";
import { useGetMeQuery, useUploadAvatarMutation } from "../../__data__/userApi";
import { TweetPost, TweetPostBlock, TweetPostInfo } from "../home/style";

import { TweetHeaed } from "./style";

const Profile = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useGetMeQuery(Number(id), { skip: !id });

  const { user } = useAuth();

  const [avatar, setAvatar] = useState(user?.photo);

  // TODO Переделать получение своего профиля
  useEffect(() => {
    if (id === "0" && user) {
      router.push(`${user.id}`);
    }
  }, [user]);

  const [uploadAvatar] = useUploadAvatarMutation();

  const clickUpload = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const changeAvarat = async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    const fileName = file.name;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    try {
      await uploadAvatar(formData as any).unwrap();
    } catch (error) {
      console.log("error", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <TweetHeaed>
        <Button square variant="thin" onClick={() => router.back()}>
          <span role="img" aria-label="recycle">
            &#8592;
          </span>
        </Button>

        <div>
          <h1>{data?.user?.name}</h1>
          <p>{data?.tweets.length} Tweets</p>
        </div>
      </TweetHeaed>
      <div style={{ position: "relative" }}>
        <img
          src=""
          alt=""
          style={{
            width: "-webkit-fill-available",
            margin: "0 -15px 0 -15px",
            height: "200px",
            objectFit: "cover",
          }}
        />
        {/* TODO: Upload Image */}
        <div style={{ position: "absolute", top: "60%" }}>
          <input
            type="file"
            style={{ display: "none" }}
            ref={inputFileRef}
            onChange={(e) => changeAvarat(e)}
          />
          <div onClick={() => clickUpload()} style={{ cursor: "pointer" }}>
            <Avatar url={avatar} noBorder={false} size={133} />
          </div>
          <div style={{ margin: "30px 0" }}>
            <h1>{data?.user?.name}</h1>
          </div>
        </div>
        {user?.id === data?.user?.id ? (
          <div style={{ position: "absolute", right: "0" }}>
            <Button>Edit profile</Button>
          </div>
        ) : null}
      </div>
      <div style={{ marginTop: "20%" }}>
        <div>
          {data &&
            data?.tweets?.map((item: any) => {
              const lines = item.text.split("\n");
              let numBreaks = 0;

              return (
                <Link href={`/tweets/${item._id}`} key={item._id}>
                  <TweetPostBlock key={item._id}>
                    <Separator />
                    <TweetPost>
                      <Link href={`/profile/${item.authorId}`}>
                        <Avatar
                          url={
                            "http://localhost:3001/avatars/" +
                            item.authorId +
                            ".png"
                          }
                          noBorder={false}
                        />
                      </Link>
                      <div>
                        <TweetPostInfo>
                          <p>{item.name}</p>
                          <span>{item.nickname}</span>
                          <span>&#8226;</span>
                          <span>{item.date}</span>
                        </TweetPostInfo>
                        {lines.map((line: string, index: number) => {
                          if (line === "") {
                            numBreaks++;
                          } else {
                            numBreaks = 0;
                          }
                          return (
                            <React.Fragment key={index}>
                              {line}
                              {index < lines.length - 1 && numBreaks < 3 && (
                                <br />
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </TweetPost>
                  </TweetPostBlock>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
