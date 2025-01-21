// src/features/darkMode/darkModeSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: {
    value: false, // false for light mode, true for dark mode
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;
export default darkModeSlice.reducer;
