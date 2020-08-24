import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import Options from "./Options";
import { HamburgerIcon, OptionsIcon, CloseIcon } from "./Icons";
import { getNotes } from "../reducers/notes";
import { clearNote, getNote } from "../reducers/note";
import { closeOptionsModal, openOptionsModal } from "../reducers/modal";
import { openSidebar, closeSidebar } from "../reducers/sidebar";
import { uploadImage } from "../utils";
import createNewEditor from "../utils/createNewEditor";
import { saveNote, deleteNote, updateNoteFromDb } from "../utils/firestore";
import DefaultCover from "../assets/default_cover.png";
import "./editor.css";

const editor = createNewEditor();

const Editor = () => {
  const editorRef = useRef(null);

  const dispatch = useDispatch();
  const note = useSelector((state) => state.note);
  const { optionsModal } = useSelector((state) => state.modal);

  if (editor && note.data) {
    editor.isReady.then(() => editor.render(JSON.parse(note.data)));
  } else {
    editor.isReady.then(() => editor.clear());
  }

  const deleteNoteHandler = () => {
    deleteNote(note.notebook, note.id).then(() => {
      dispatch(closeOptionsModal());
      dispatch(getNotes(note.notebook));
      dispatch(clearNote());
    });
  };

  const addCoverHandler = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const res = await uploadImage(file);
      await updateNoteFromDb(note, { cover: res.file.url });
      dispatch(getNote({ notebook: note.notebook, noteId: note.id }));
    }
  };

  const saveNoteHandler = async () => {
    const data = await editor.save();

    const title = data.blocks[0];

    if (title.type !== "header" || !note.id) {
      console.log("Note cannot be saved without title or note id");
      return;
    }

    const description =
      data.blocks.find((block) => block.type === "paragraph").data.text || "";

    const updatedNote = {
      ...note,
      title: title.data.text,
      description,
      data: JSON.stringify(data),
    };

    saveNote(updatedNote).then(() => {
      dispatch(getNotes(note.notebook));
      dispatch(getNote({ notebook: note.notebook, noteId: note.id }));
    });
  };

  return (
    <div className="editor">
      <div className="header">
        <HamburgerIcon onClick={() => dispatch(openSidebar())} />
        <h3 onClick={() => dispatch(closeSidebar())}>Remember</h3>
      </div>
      <div className="input-cover">
        <label htmlFor="add-cover">
          <img
            className="note-cover"
            src={note.cover ? note.cover : DefaultCover}
            alt="cover"
          />
        </label>
        {note.id && (
          <input id="add-cover" type="file" onChange={addCoverHandler} />
        )}
      </div>

      {note.id && (
        <div className="save-options">
          <button className="app-btn" onClick={saveNoteHandler}>
            Save
          </button>

          <OptionsIcon onClick={() => dispatch(openOptionsModal())} />
        </div>
      )}

      {optionsModal && (
        <Modal>
          <Options deleteNoteHandler={deleteNoteHandler} />
        </Modal>
      )}

      <div
        style={{ display: !note.data ? "none" : "" }}
        id="editorjs"
        ref={editorRef}
      ></div>
    </div>
  );
};

export default Editor;
