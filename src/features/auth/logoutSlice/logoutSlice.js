import { logout } from "@/services/auth/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const logoutSlice = createSlice({
  name: "logout",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default logoutSlice.reducer;
