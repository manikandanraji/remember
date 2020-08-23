import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Editor from "./components/Editor";
import Sidebar from "./components/Sidebar";
import Notes from "./components/Notes";
import Auth from "./components/Auth";

const App = () => {
  const { theme } = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    Object.keys(theme).forEach((key) => {
      const value = theme[key];
      document.documentElement.style.setProperty(key, value);
    });
  }, [theme]);

  if (!user.name) {
    return <Auth />;
  }

  return (
    <>
      <Sidebar />
      <Notes />
      <Editor />
    </>
  );
};

export default App;
