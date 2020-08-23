import { createSlice } from "@reduxjs/toolkit";
import {
  lightTheme,
  darkTheme,
  solarizedDarkTheme,
  solarizedLightTheme,
  gruvboxDarkTheme,
  nordTheme,
  draculaTheme,
} from "../styles/themes";

const themes = {
  lightTheme,
  darkTheme,
  solarizedDarkTheme,
  solarizedLightTheme,
  gruvboxDarkTheme,
  nordTheme,
  draculaTheme,
};
const localSt = localStorage.getItem("themePreference");

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    themes: [
      "light",
      "dark",
      "solarizedDark",
      "solarizedLight",
      "gruvboxDark",
      "nord",
      "dracula",
    ],
    current: localSt ? localSt : "dark",
    theme: localSt ? themes[`${localSt}Theme`] : darkTheme,
  },
  reducers: {
    changeTheme(state, action) {
      const getCurrentTheme = state.current;
      const idx = state.themes.indexOf(getCurrentTheme);
      const theme =
        idx + 1 < state.themes.length ? state.themes[idx + 1] : "light";

      switch (theme) {
        case "light":
          localStorage.setItem("themePreference", theme); // is this bad practice?
          return { ...state, current: theme, theme: lightTheme };
        case "dark":
          localStorage.setItem("themePreference", theme);
          return { ...state, current: theme, theme: darkTheme };
        case "dracula":
          localStorage.setItem("themePreference", theme);
          return { ...state, current: theme, theme: draculaTheme };
        case "solarizedDark":
          localStorage.setItem("themePreference", theme);
          return {
            ...state,
            current: theme,
            theme: solarizedDarkTheme,
          };
        case "solarizedLight":
          localStorage.setItem("themePreference", theme);
          return {
            ...state,
            current: theme,
            theme: solarizedLightTheme,
          };
        case "gruvboxDark":
          localStorage.setItem("themePreference", theme);
          return { ...state, current: theme, theme: gruvboxDarkTheme };
        case "nord":
          localStorage.setItem("themePreference", theme);
          return { ...state, current: theme, theme: nordTheme };
        default:
          return state;
      }
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
