import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import { applyTheme } from "./utils";

const App = () => {
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
		applyTheme(theme)
  }, [theme]);

  return (
    <>
			<Sidebar />
			<Notes />
      <Editor />
    </>
  );
};

export default App;
