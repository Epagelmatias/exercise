import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Message } from "../utils/types";

interface AppState {
  users: User[];
  messagesBetween: Message[];
  usersMessaged: User[];
}

const initialState: AppState = {
  users: [],
  messagesBetween: [],
  usersMessaged: [],
};

type InitialState = typeof initialState;

const appState = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setUsers: (state: InitialState, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    setMessagesBetween: (state: InitialState, action: PayloadAction<Message[]>) => {
      state.messagesBetween = action.payload;
    },
    setUsersMessaged: (state: InitialState, action: PayloadAction<User[]>) => {
      state.usersMessaged = action.payload;
    },
  },
});

export const { setUsers, setMessagesBetween, setUsersMessaged } =
  appState.actions;

export default appState.reducer;
