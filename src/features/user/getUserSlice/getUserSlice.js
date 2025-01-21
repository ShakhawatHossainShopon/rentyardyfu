import { getUser } from "@/services/user/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const getUserSlice = createSlice({
  name: "getUser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.user;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getUserSlice.reducer;
