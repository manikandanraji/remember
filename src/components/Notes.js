import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Note from "./Note";
import Modal from "./Modal";
import NewNote from "./NewNote";
import { DeleteIcon, PencilIcon } from "./Icons";
import { openNoteModal } from "../reducers/modal";
import { getNotebooks } from "../reducers/notebooks";
import { getNotes, searchNotes } from "../reducers/notes";
import { deleteNotebook } from "../utils/firestore";
import "./notes.css";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const { noteModal } = useSelector((state) => state.modal);

  const addNoteHandler = () => {
    dispatch(openNoteModal());
  };

  const deleteNotebookHandler = () => {
    deleteNotebook(notes.notebook).then(() => {
      dispatch(getNotebooks());
    });
  };

  const searchNotesHandler = e => {
    if (e.target.value.trim()) {
      dispatch(searchNotes(e.target.value));
    } else {
      dispatch(getNotes(notes.notebook));
    }
  };

  return (
    <div className="notes-panel">
      <div className="search-notes">
        <input
          type="text"
          placeholder="search notes"
          onChange={searchNotesHandler}
        />
        <PencilIcon onClick={addNoteHandler} />
      </div>

      {notes?.notes?.map((note) => (
        <Note key={note.id} note={note} />
      ))}

      {!notes.count && (
        <div className="delete-notebook" onClick={deleteNotebookHandler}>
          <DeleteIcon /> <span>Delete Notebook</span>
        </div>
      )}

      {noteModal && (
        <Modal>
          <NewNote />
        </Modal>
      )}
    </div>
  );
};

export default Notes;
