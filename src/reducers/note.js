import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db from "../firebase";

export const getNote = createAsyncThunk(
  "/note/getNote",
  async ({ notebook, noteId }, thunk) => {
    const doc = await db
      .collection("notebooks")
      .doc(notebook)
      .collection("notes")
      .doc(noteId)
      .get();

    return doc.data();
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState: {},
  reducers: {
    clearNote(state, action) {
      return {};
    },
    updateNote(state, action) {
      return { ...state, ...action.payload };
    },
  },
  extraReducers: {
    [getNote.fulfilled]: (state, action) => action.payload,
  },
});

export const { updateNote, clearNote } = noteSlice.actions;

export default noteSlice.reducer;
