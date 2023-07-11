import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user = action.payload;
      console.log(state.user);
      return state;
    },
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
