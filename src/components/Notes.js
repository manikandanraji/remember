import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Note from "./Note";
import { DeleteIcon } from "./Icons";
import { getNotebooks } from "../reducers/notebooks";
import { getNotes, searchNotes } from "../reducers/notes";
import { deleteNotebook } from "../utils/firestore";
import "./notes.css";

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);

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
      </div>

      {notes?.notes?.map((note) => (
        <Note key={note.id} note={note} />
      ))}

      {notes.count < 1 && (
        <div className="delete-notebook" onClick={deleteNotebookHandler}>
          <DeleteIcon /> <span>Delete Notebook</span>
        </div>
      )}
    </div>
  );
};

export default Notes;
