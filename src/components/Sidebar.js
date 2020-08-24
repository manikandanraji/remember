import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import AddNotebook from "./AddNotebook";
import NewNote from "./NewNote";
import { NotebookIcon, CloseIcon, PencilIcon } from "./Icons";
import { getNotebooks } from "../reducers/notebooks";
import { getNotes } from "../reducers/notes";
import { getNote } from "../reducers/note";
import { closeSidebar } from "../reducers/sidebar";
import { openNoteModal, openNotebookModal } from "../reducers/modal";
import "./sidebar.css";

const Sidebar = () => {
  const dispatch = useDispatch();

  const notebooks = useSelector((state) => state.notebooks);
  const selectedNote = useSelector((state) => state.note);
  const sidebar = useSelector((state) => state.sidebar);

  const { notebook: selectedNotebook, notes } = useSelector(
    (state) => state.notes
  );

  const { noteModal, notebookModal } = useSelector((state) => state.modal);

  const getNotesHandler = (notebook) => {
    dispatch(getNotes(notebook));
  };

  useEffect(() => {
    dispatch(getNotebooks());

    if (notebooks.length) {
      dispatch(getNotes(notebooks[0]));
    }
  }, [dispatch, notebooks.length]);

  return (
    <div className={`sidebar ${sidebar ? "mobile" : ""}`}>
      <div className="username-close">
        <span className="user">Manikandan</span>
				{sidebar && <CloseIcon onClick={() => dispatch(closeSidebar())}/>}
      </div>

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
                    {note.title}
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
