import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { api } from "./api";
import { UserData } from "./auth/authApi";

type UserResponse = {
  user: UserData;
  tweets: [];
};

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<UserResponse, number>({
      query: (id) => `user/${id}`,
      // providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    uploadAvatar: build.mutation<UserResponse, Partial<UserData>>({
      query(body) {
        return {
          url: `/user/uploadavatar`,
          method: "POST",
          credentials: "include",
          body,
        };
      },

      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
});

export const { useGetMeQuery, useUploadAvatarMutation } = userApi;

export const {
  endpoints: { getMe, uploadAvatar },
} = userApi;
