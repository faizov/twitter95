import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useRef,
  useState,
} from "react";

import {
  Button,
  TextInput,
  Toolbar,
  Window,
  WindowContent,
  WindowHeader,
} from "react95";
import styled from "styled-components";
import { UserData } from "../../__data__/auth/authApi";

import { Avatar } from "../../components/customs";
import {
  useUploadAvatarMutation,
  useEditMutation,
} from "../../__data__/userApi";

const Wrapper = styled.div`
  position: fixed;
  z-index: 2;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0 0 0 / 65%);

  .window-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .close-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin-left: -1px;
    margin-top: -1px;
    transform: rotateZ(45deg);
    position: relative;
    &:before,
    &:after {
      content: "";
      position: absolute;
      background: ${({ theme }) => theme.materialText};
    }
    &:before {
      height: 100%;
      width: 3px;
      left: 50%;
      transform: translateX(-50%);
    }
    &:after {
      height: 3px;
      width: 100%;
      left: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .window {
    max-width: 600px;
    min-width: 500px;
    min-height: 200px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .window:nth-child(2) {
    margin: 2rem;
  }
  .footer {
    display: block;
    margin: 0.25rem;
    height: 31px;
    line-height: 31px;
    padding-left: 0.25rem;
  }
`;

type UserResponse = {
  user: UserData;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const EditModal = ({ user, setOpenModal }: UserResponse) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar);

  const [name, setName] = useState(user?.name);
  const [bio, setBio] = useState(user?.bio);
  const [avatar, setAvatar] = useState<File>();

  const [uploadAvatar] = useUploadAvatarMutation();
  const [edit] = useEditMutation();
  const { _id } = user;

  const clickSaveButton = async () => {
    if (_id && name && bio) {
      edit({ _id, name, bio })
        .unwrap()
        .then((response) => {
          if (response) {
            localStorage.setItem("user", JSON.stringify(response));
            setOpenModal(false);
          }
        });
    }

    if (avatar) {
      const formData = new FormData();
      const fileName = avatar.name;
      formData.append("file", avatar);
      formData.append("fileName", fileName);

      try {
        await uploadAvatar(formData as any).unwrap();
      } catch (error) {
        console.log("error", error);
      }
    }
  };

  const clickUpload = () => {
    if (inputFileRef.current) {
      inputFileRef.current.click();
    }
  };

  const changeAvarat = async (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  return (
    <Wrapper>
      <Window resizable className="window">
        <WindowHeader className="window-title">
          <span>Edit.exe</span>
          <Button onClick={() => setOpenModal(false)}>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <Toolbar>
          <Button
            variant="menu"
            size="sm"
            onClick={() => clickSaveButton()}
            disabled={!name || !bio}
          >
            Save
          </Button>
        </Toolbar>
        <WindowContent>
          <input
            type="file"
            style={{ display: "none" }}
            ref={inputFileRef}
            onChange={(e) => changeAvarat(e)}
          />
          <div
            onClick={() => clickUpload()}
            className="edit-avatar"
            style={{ width: "max-content", cursor: "pointer" }}
          >
            <Avatar url={avatarPreview} noBorder={false} size={133} />
          </div>
          <br />
          <br />
          <TextInput
            value={name}
            placeholder="Name"
            fullWidth
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
          />
          <br />
          <TextInput
            multiline
            rows={4}
            fullWidth
            placeholder="Bio"
            defaultValue={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={200}
          />
        </WindowContent>
      </Window>
    </Wrapper>
  );
};
