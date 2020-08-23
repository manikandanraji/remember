import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNote } from "../reducers/note";

const Note = ({ note }) => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes);
  const selectedNote = useSelector((state) => state.note);

  const getNoteHandler = (id) => {
    dispatch(getNote({ notebook: notes.notebook, noteId: id }));
  };

  return (
    <div
      className={`note-preview ${
        selectedNote.id === note.id ? "selected-note" : ""
      }`}
      onClick={() => getNoteHandler(note.id)}
    >
      <h4>{note.title}</h4>
			<p>{note.description.length > 60 ? note.description.substr(0, 60) + '...' : note.description}</p>
    </div>
  );
};

export default Note;
