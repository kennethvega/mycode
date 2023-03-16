import { RootState } from "./../app/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type initialState = {
  authIsReady: boolean;
  user: null | User;
  username: null | string;
};
const initialState: initialState = {
  authIsReady: false,
  user: null,
  username: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.username = action.payload?.displayName;
    },
    logout: (state) => {
      (state.user = null), (state.username = null);
    },
    authIsReady: (state, action) => {
      (state.user = action.payload),
        (state.authIsReady = true),
        (state.username = action.payload?.displayName);
    },
  },
});

// actions
export const { login, logout, authIsReady } = authSlice.actions;

// // Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.auth.user;
export const selectUsername = (state: RootState) => state.auth.username;
export const selectAuth = (state: RootState) => state.auth.authIsReady;

export default authSlice.reducer;
