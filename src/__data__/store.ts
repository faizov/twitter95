import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { tweetsApi } from "./tweetsApi";

export const store = () =>
  configureStore({
    reducer: {
      [tweetsApi.reducerPath]: tweetsApi.reducer,
    },
    middleware: (gDM) => gDM().concat(tweetsApi.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
