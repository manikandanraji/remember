import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { CloseIcon } from "./Icons";
import { closeNoteModal } from "../reducers/modal";
import { getNotes } from "../reducers/notes";
import { getNote } from "../reducers/note";
import { uuid, createNewNote } from "../utils";
import { addNote } from "../utils/firestore";
import "./newnote.css";

const NewNote = () => {
  const dispatch = useDispatch();
  const { notebook } = useSelector((state) => state.notes);

  const closeNoteModalHandler = () => {
    dispatch(closeNoteModal());
  };

  const addNoteHandler = (e) => {
    if (e.keyCode === 13) {
      closeNoteModalHandler();

      const newNote = {
        id: uuid(),
        notebook,
        title: e.target.value,
        description: "",
        data: createNewNote(e.target.value),
      };

      addNote(notebook, newNote).then(() => {
        dispatch(getNotes(notebook));
        dispatch(getNote({ notebook, noteId: newNote.id }));
      });
    }
  };

  return (
    <div className="new-note">
      <div className="header">
        <h3>New Note</h3>
        <CloseIcon onClick={closeNoteModalHandler} />
      </div>

      <div className="content">
        <input
          type="text"
          placeholder="State Management"
          onKeyDown={addNoteHandler}
        />
      </div>
    </div>
  );
};

export default NewNote;
