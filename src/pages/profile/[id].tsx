import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react95";
import { Avatar } from "../../components/customs";
import Tweet from "../../components/tweets";
import { useAuth } from "../../hooks/useAuth";
import { useGetMeQuery, useUploadAvatarMutation } from "../../__data__/userApi";
import { EditModal } from "./edit";

import { TweetHeaed, Wrapper } from "./style";

const Profile = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useGetMeQuery(Number(id), { skip: !id });

  const { user } = useAuth();

  const [openModal, setOpenModal] = useState(false);

  // TODO Переделать получение своего профиля
  useEffect(() => {
    if (id === "0" && user) {
      router.push(`${user.id}`);
    }
  }, [user]);

  const [uploadAvatar] = useUploadAvatarMutation();

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

        <Avatar url={data?.user?.avatar} noBorder={false} size={133} />

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
      <div>
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
