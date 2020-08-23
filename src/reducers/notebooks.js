import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db from "../firebase";

export const getNotebooks = createAsyncThunk(
  "notebooks/getNotebooks",
  async () => {
    const snapshot = await db.collection("notebooks").get();

    const notebooks = [];
    snapshot.forEach((doc) => {
      notebooks.push(doc.data());
    });

    return notebooks;
  }
);

const notebooksSlice = createSlice({
  name: "notebooks",
  initialState: [],
  reducers: {},
  extraReducers: {
    [getNotebooks.fulfilled]: (state, action) => {
      return action.payload.map((notebook) => notebook.name);
    },
  },
});

export default notebooksSlice.reducer;
