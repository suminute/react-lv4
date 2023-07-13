import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: localStorage.getItem("token"),
  },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      sessionStorage.setItem("accessToken", action.payload);
    },
    logout(state) {
      state.token = null;
      sessionStorage.removeItem("accessToken");
    },
  },
});

export const { login, logout } = tokenSlice.actions;
export default tokenSlice.reducer;
