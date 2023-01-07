import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

interface Tweet {
  id: string;
  date: string;
  name: string;
  avatar: string;
  nickname: string;
  text: string;
}

type TweetsResponse = Tweet[];

export const tweetsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/tweets",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Tweets"],
  endpoints: (build) => ({
    getTweets: build.query<TweetsResponse, void>({
      query: () => "/",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Tweets" as const, id })),
              { type: "Tweets", id: "LIST" },
            ]
          : [{ type: "Tweets", id: "LIST" }],
    }),
    getTweet: build.query<Tweet, string>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Tweets", id }],
    }),
    addTweet: build.mutation<Tweet, Partial<Tweet>>({
      query(body) {
        return {
          url: `add`,
          method: "POST",
          body,
        };
      },

      invalidatesTags: [{ type: "Tweets", id: "LIST" }],
    }),
  }),
});

export const { useGetTweetsQuery, useGetTweetQuery, useAddTweetMutation } =
  tweetsApi;

export const { getTweets, getTweet, addTweet } = tweetsApi.endpoints;
