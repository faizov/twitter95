import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { api } from "./api";

export interface Tweet {
  id: string | string[] | undefined;
  _id: string;
  authorId: string;
  date: string;
  name: string;
  avatar: string;
  nickname: string;
  text: string;
  likes: number;
}

export type Comment = {
  tweetId: string | string[] | undefined;
  id: number;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
  date: string;
  text: string;
};

type CommentsResponse = Comment[];
type TweetsResponse = Tweet[];

export const tweetsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTweets: build.query<TweetsResponse, void>({
      query: () => "tweets",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: "Tweets" as const, _id })),
              { type: "Tweets", id: "LIST" },
            ]
          : [{ type: "Tweets", id: "LIST" }],
    }),
    getTweet: build.query<Tweet, string>({
      query: (id) => `tweets/${id}`,
      providesTags: (result, error, id) => [{ type: "Tweets", id }],
    }),
    addTweet: build.mutation<Tweet, Partial<Tweet>>({
      query(body) {
        return {
          url: `/tweets`,
          method: "POST",
          body,
        };
      },

      invalidatesTags: [{ type: "Tweets", id: "LIST" }],
    }),
    deleteTweet: build.mutation<Tweet, string>({
      query(id) {
        return {
          url: `tweets/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: (result, error, id) => [{ type: "Tweets", id }],
    }),
    likeTweet: build.mutation<Tweet, string>({
      query: (id) => ({
        url: `tweets/${id}/like`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Tweets", id }],
    }),
    addComment: build.mutation<Comment, Partial<Comment>>({
      query({ tweetId, ...body }) {
        return {
          url: `/tweets/${tweetId}/comments`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Comments", id: "LIST" }],
    }),
    getComments: build.query<CommentsResponse, string>({
      query: (id) => `/tweets/${id}/comments`,
      // highlight-start
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Comments" as const, id })),
              { type: "Comments", id: "LIST" },
            ]
          : [{ type: "Comments", id: "LIST" }],
      // highlight-end
    }),
  }),
});

export const {
  useAddTweetMutation,
  useGetTweetQuery,
  useGetTweetsQuery,
  useLazyGetTweetQuery,
  useLazyGetTweetsQuery,
  useDeleteTweetMutation,
  useLikeTweetMutation,
  useAddCommentMutation,
  useGetCommentsQuery,
} = tweetsApi;

export const {
  endpoints: { addTweet, getTweet, getTweets, deleteTweet, likeTweet },
} = tweetsApi;
