import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import playerReducer from "./features/playerSlice";
import { musicApi } from "./services/musicApi";

export const store = configureStore({
  reducer: {
    [musicApi.reducerPath]: musicApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(musicApi.middleware),
});
