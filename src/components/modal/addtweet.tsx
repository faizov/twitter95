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
import { addTweet, useAddTweetMutation } from "../../__data__/tweetsApi";
import { useAuth } from "../../hooks/useAuth";

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

type Responce = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};

export const AddTweetModal = ({ setOpenModal }: Responce) => {
  const auth = useAuth();
  const { user } = auth;
  const [input, setInput] = useState("");
  let countInput = 280 - input.length;

  const [addTweet, { isLoading: isLoadingAdd }] = useAddTweetMutation();

  const addTweetClick = async () => {
    if (input.length > 280) {
      return <>Error</>;
    }
    try {
      if (user) {
        const body = {
          name: user.name,
          avatar: user.avatar,
          nickname: "YuriyF",
          text: input,
        };
        setInput("");
        setOpenModal(false)
        await addTweet(body);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Wrapper>
      <Window resizable className="window">
        <WindowHeader className="window-title">
          <span>Add.exe</span>
          <Button onClick={() => setOpenModal(false)}>
            <span className="close-icon" />
          </Button>
        </WindowHeader>
        <Toolbar>
          <Button
            variant="menu"
            size="sm"
            disabled={!input}
            onClick={() => addTweetClick()}
          >
            Add tweet
          </Button>
        </Toolbar>
        <WindowContent>
          <TextInput
            multiline
            variant="flat"
            rows={7}
            fullWidth
            placeholder="What's happening?"
            maxLength={200}
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </WindowContent>
      </Window>
    </Wrapper>
  );
};
