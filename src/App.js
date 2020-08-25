import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Auth from "./components/Auth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { applyTheme } from "./utils";

const App = () => {
  const { theme } = useSelector((state) => state.theme);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return <>{user.name ? <ProtectedRoutes /> : <Auth />}</>;
};

export default App;
