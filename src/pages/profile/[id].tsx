import Link from "next/link";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Button, Separator } from "react95";
import { Avatar } from "../../components/customs";
import Tweet from "../../components/tweets";
import { useAuth } from "../../hooks/useAuth";
import { useGetMeQuery, useUploadAvatarMutation } from "../../__data__/userApi";
import { TweetPost, TweetPostBlock, TweetPostInfo } from "../home/style";
import { EditModal } from "./edit";

import { TweetHeaed, Wrapper } from "./style";

const Profile = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useGetMeQuery(Number(id), { skip: !id });

  const { user } = useAuth();

  const [avatar, setAvatar] = useState(user?.photo);

  const [openModal, setOpenModal] = useState(false);

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

  const clickOpenModal = () => {
    setOpenModal(true);
  };

  return (
    <Wrapper>
      {openModal && data ? (
        <EditModal user={data.user} setOpenModal={setOpenModal} />
      ) : null}
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
      <div className="profile-header">
        {/* <img
          src=""
          alt=""
          style={{
            width: "-webkit-fill-available",
            margin: "0 -15px 0 -15px",
            height: "200px",
            objectFit: "cover",
          }}
        /> */}

        <Avatar url={data?.user?.photo} noBorder={false} size={133} />

        {user?.id === data?.user?.id ? (
          <div>
            <Button onClick={() => clickOpenModal()}>Edit profile</Button>
          </div>
        ) : null}
      </div>
      <br />
      <h1>{data?.user?.name}</h1>
      <br />
      {data?.user.bio ? <p>{data?.user.bio}</p> : null}
      <div>А
        <div>
          {data &&
            data?.tweets?.map((item) => {
              return <Tweet item={item} />;
            })}
        </div>
      </div>
    </Wrapper>
  );
};

export default Profile;
