import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

interface Tweet {
  id: number;
  date: string;
  name: string;
  avatar: string;
  nickname: string;
  text: string;
  likes: number;
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
    getTweet: build.query<Tweet, number>({
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
    likeTweet: build.mutation<Tweet, number>({
      query: (id) => ({
        url: `/${id}/like`,
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
  useGetTweetsQuery,
  useGetTweetQuery,
  useAddTweetMutation,
  useLikeTweetMutation,
} = tweetsApi;

export const { getTweets, getTweet, addTweet, likeTweet } = tweetsApi.endpoints;
