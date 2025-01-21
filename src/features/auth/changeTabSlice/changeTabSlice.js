import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tabValue: "login",
};

const changeTabSlice = createSlice({
  name: "otp",
  initialState,
  reducers: {
    setTabValue: (state, action) => {
      state.tabValue = action.payload;
    },
  },
});
export const { setTabValue } = changeTabSlice.actions;
export default changeTabSlice.reducer;
