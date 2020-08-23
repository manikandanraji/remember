import React from "react";
import { useDispatch } from "react-redux";
import { DeleteIcon, CloseIcon } from "./Icons";
import { closeOptionsModal } from "../reducers/modal";
import "./options.css";

const Options = ({ deleteNoteHandler }) => {
  const dispatch = useDispatch();

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
    </div>
  );
};

export default Options;
