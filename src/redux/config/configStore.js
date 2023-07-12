import { configureStore } from "@reduxjs/toolkit";
import user from "../modules/userSlice";
import token from "../modules/tokenSlice";

const store = configureStore({
  reducer: { user: user, token: token },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
