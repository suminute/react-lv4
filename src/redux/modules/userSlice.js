import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    userId: null,
    displayName: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        return state;
      } else {
        state.userId = null;
        state.displayName = null;
      }
    },
  },
});

export const { getUser } = userSlice.actions;
export default userSlice.reducer;
