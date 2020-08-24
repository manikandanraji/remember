import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteIcon, DownloadIcon, CloseIcon } from "./Icons";
import { closeOptionsModal } from "../reducers/modal";
import downloadAsPdf from "../utils/downloadAsPdf";
import "./options.css";

const Options = ({ deleteNoteHandler }) => {
  const dispatch = useDispatch();

  const dom = document.getElementById("editorjs");
  const { theme } = useSelector((state) => state.theme);
  const { title } = useSelector((state) => state.note);

  const downloadAsPdfHandler = () => {
    downloadAsPdf({ dom, title, bg: theme["--bg"] });
    dispatch(closeOptionsModal());
  };

  return (
    <div className="options">
      <div className="header">
        <h3>Options</h3>
        <CloseIcon onClick={() => dispatch(closeOptionsModal())} />
      </div>

      <div className="action" onClick={deleteNoteHandler}>
        <DeleteIcon />
        <span>Delete</span>
      </div>

      <div className="action" onClick={downloadAsPdfHandler}>
        <DownloadIcon />
        <span>Export to PDF</span>
      </div>
    </div>
  );
};

export default Options;
