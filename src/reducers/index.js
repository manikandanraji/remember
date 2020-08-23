import { combineReducers } from "@reduxjs/toolkit";
import notebooks from "./notebooks";
import notes from "./notes";
import note from "./note";
import theme from "./theme";
import modal from "./modal";
import user from "./user";

export default combineReducers({
	notebooks,
  notes,
	note,
  theme,
	modal,
	user,
});
