import { configureStore } from "@reduxjs/toolkit";
import githubRepoReducer from "./githubRepoSlice";

const store = configureStore({
  reducer: {
    githubRepos: githubRepoReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
