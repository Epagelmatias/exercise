import { configureStore } from "@reduxjs/toolkit";
import appStateReducer from "./appState";

const store = configureStore({
  reducer: {
    appState: appStateReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
