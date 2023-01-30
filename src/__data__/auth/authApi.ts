import { HYDRATE } from "next-redux-wrapper";
import { api } from "../api";

export interface UserData {
  _id: string;
  id: string;
  email: string;
  avatar: string;
  avatarFile: File;
  name: string;
  bio?: string;
  likes?: string[];
}

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    user: build.mutation({
      query: (token) => ({
        url: "user",
        method: "GET",
        token,
      }),
    }),
    google: build.mutation({
      query: (credentials) => ({
        url: "/auth/google",
        method: "GET",
      }),
    }),
    protected: build.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const { useGoogleMutation, useUserMutation } = authApi;

export const { google } = authApi.endpoints;
