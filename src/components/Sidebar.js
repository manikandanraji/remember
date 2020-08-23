import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import AddNotebook from "./AddNotebook";
import NewNote from "./NewNote";
import { NotebookIcon, PencilIcon } from "./Icons";
import { getNotebooks } from "../reducers/notebooks";
import { getNotes } from "../reducers/notes";
import { getNote } from "../reducers/note";
import { changeTheme } from "../reducers/theme";
import { openNoteModal, openNotebookModal } from "../reducers/modal";
import "./sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.user);
  const notebooks = useSelector((state) => state.notebooks);
  const selectedNote = useSelector((state) => state.note);
  const { notebook: selectedNotebook, notes } = useSelector(
    (state) => state.notes
  );
  const { noteModal, notebookModal } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(getNotebooks());

    if (notebooks.length) {
      dispatch(getNotes(notebooks[0]));
    }
  }, [dispatch, notebooks.length]);

  const getNotesHandler = (notebook) => {
    dispatch(getNotes(notebook));
  };

  return (
    <div className="sidebar">
      <span className="user" onClick={() => dispatch(changeTheme())}>
        {name}
      </span>

      <ul className="notebooks">
        {notebooks.map((notebook) => (
          <div key={notebook}>
            <li
              className={
                selectedNotebook === notebook ? "selected-notebook" : ""
              }
            >
              <span onClick={() => getNotesHandler(notebook)}>{notebook}</span>{" "}
              {selectedNotebook === notebook && (
                <PencilIcon onClick={() => dispatch(openNoteModal())} />
              )}
            </li>

            {notebook === selectedNotebook && (
              <div className="notes">
                {notes?.map((note) => (
                  <p
                    className={
                      selectedNote.id === note.id ? "selected-note-sidebar" : ""
                    }
                    key={note.id}
                    onClick={() =>
                      dispatch(getNote({ notebook, noteId: note.id }))
                    }
                  >
                    {note.title.substr(0, 12) + "..."}
                  </p>
                ))}
              </div>
            )}
          </div>
        ))}
      </ul>

      <div
        className="new-notebook"
        onClick={() => dispatch(openNotebookModal())}
      >
        <NotebookIcon />
        <span>Notebook</span>
      </div>

      {notebookModal && (
        <Modal>
          <AddNotebook />
        </Modal>
      )}

      {noteModal && (
        <Modal>
          <NewNote />
        </Modal>
      )}
    </div>
  );
};

export default Sidebar;
