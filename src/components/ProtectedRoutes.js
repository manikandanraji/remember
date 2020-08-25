import React from 'react';
import Sidebar from "./Sidebar";
import Notes from "./Notes";
import Editor from "./Editor";

const ProtectedRoutes = () => (
  <>
    <Sidebar />
    <Notes />
    <Editor />
  </>
);

export default ProtectedRoutes;
