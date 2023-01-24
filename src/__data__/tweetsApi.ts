import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { api } from "./api";

interface Tweet {
  id: number;
  authorId: string;
  date: string;
  name: string;
  avatar: string;
  nickname: string;
  text: string;
  likes: number;
}

type TweetsResponse = Tweet[];

export const tweetsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTweets: build.query<TweetsResponse, void>({
      query: () => "tweets",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tweets" as const, id })),
              { type: "Tweets", id: "LIST" },
            ]
          : [{ type: "Tweets", id: "LIST" }],
    }),
    getTweet: build.query<Tweet, number>({
      query: (id) => `tweets/${id}`,
      providesTags: (result, error, id) => [{ type: "Tweets", id }],
    }),
    addTweet: build.mutation<Tweet, Partial<Tweet>>({
      query(body) {
        return {
          url: `/tweets/add`,
          method: "POST",
          body,
        };
      },

      invalidatesTags: [{ type: "Tweets", id: "LIST" }],
    }),
    likeTweet: build.mutation<Tweet, number>({
      query: (id) => ({
        url: `tweets/${id}/like`,
        method: "PATCH",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tweetsApi.util.updateQueryData("getTweet", id, (draft) => {
            draft.likes += 1;
          })
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useAddTweetMutation,
  useGetTweetQuery,
  useGetTweetsQuery,
  useLazyGetTweetQuery,
  useLazyGetTweetsQuery,
  useLikeTweetMutation,
} = tweetsApi;

export const {
  endpoints: { addTweet, getTweet, getTweets, likeTweet },
} = tweetsApi;
