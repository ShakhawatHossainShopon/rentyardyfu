import { setNewPass } from "@/services/auth/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  success: false,
};

const setNewPassSlice = createSlice({
  name: "setNewPass",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(setNewPass.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(setNewPass.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(setNewPass.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default setNewPassSlice.reducer;
