import { createSlice } from "@reduxjs/toolkit";
import type { UserData } from "./authApi";
import type { RootState } from "../store";

type AuthState = {
  user: UserData | null;
  token: string | null;
  likes: [];
};

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
  } as AuthState,
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = payload.user;
      state.token = payload.token;
      state.likes = payload.likes;

      localStorage.setItem("user", JSON.stringify(payload.user));
      localStorage.setItem("ids", JSON.stringify(payload.likes));
      localStorage.setItem("token", payload.token);
    },
    removeCredentials: (state) => {
      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, removeCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
