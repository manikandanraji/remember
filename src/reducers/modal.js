import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    noteModal: false,
    notebookModal: false,
		optionsModal: false,
  },
  reducers: {
    openNoteModal(state, action) {
      return { ...state, noteModal: true };
    },
    closeNoteModal(state, action) {
      return { ...state, noteModal: false };
    },
    openNotebookModal(state, action) {
      return { ...state, notebookModal: true };
    },
    closeNotebookModal(state, action) {
      return { ...state, notebookModal: false };
    },
    openOptionsModal(state, action) {
      return { ...state, optionsModal: true };
    },
    closeOptionsModal(state, action) {
      return { ...state, optionsModal: false };
    },
  },
});

export const {
  openNoteModal,
  closeNoteModal,
  openNotebookModal,
  closeNotebookModal,
	openOptionsModal,
	closeOptionsModal,
} = modalSlice.actions;

export default modalSlice.reducer;
