import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import { api } from "./api";

import authReducer from "./auth/authSliced";

export const store = () =>
  configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      auth: authReducer,
    },
    middleware: (gDM) => gDM().concat(api.middleware),
  });

export type AppStore = ReturnType<typeof store>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: true });
