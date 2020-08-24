import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Manikandan",
  },
  reducers: {
    loginUser(state, action) {
      return action.payload;
    },
  },
});

export const { loginUser } = userSlice.actions;

export default userSlice.reducer;
