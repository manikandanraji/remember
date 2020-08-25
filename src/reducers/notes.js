import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import db from "../firebase";

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (notebook, thunk) => {
    const user = JSON.parse(localStorage.getItem("user"));

    const snapshot = await db
      .collection("users")
      .doc(user.id)
      .collection("notebooks")
      .doc(notebook)
      .collection("notes")
      .get();

    const notes = [];

    snapshot.forEach((doc) => notes.push(doc.data()));

    return {
      notebook,
      count: notes.length,
      notes,
    };
  }
);

const notesSlice = createSlice({
  name: "notes",
  initialState: {},
  reducers: {
    searchNotes(state, action) {
      return {
        ...state,
        notes: state.notes.filter((note) =>
          note.data.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    },
  },
  extraReducers: {
    [getNotes.fulfilled]: (state, action) => action.payload,
  },
});

export const { searchNotes } = notesSlice.actions;

export default notesSlice.reducer;
