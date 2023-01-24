import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  retry,
} from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { removeCredentials } from "./auth/authSliced";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3001",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

//retry(baseQuery)
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    api.dispatch(removeCredentials());
  }

  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: ["Tweets", "User"],
  endpoints: () => ({}),
});
