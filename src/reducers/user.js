import { createSlice } from "@reduxjs/toolkit";

const user = localStorage.getItem("user");

const userSlice = createSlice({
  name: "user",
  initialState: user ? JSON.parse(user) : {},
  reducers: {
    loginUser(state, action) {
      return action.payload;
    },
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
