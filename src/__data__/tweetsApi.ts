import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

import { api } from "./api";

interface Tweet {
  _id: string;
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
    getTweet: build.query<Tweet, string>({
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
    deleteTweet: build.mutation<Tweet, string>({
      query(id) {
        return {
          url: `tweets/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Tweets"],
    }),
    likeTweet: build.mutation<Tweet, string>({
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
  useDeleteTweetMutation,
  useLikeTweetMutation,
} = tweetsApi;

export const {
  endpoints: { addTweet, getTweet, getTweets, deleteTweet, likeTweet },
} = tweetsApi;
