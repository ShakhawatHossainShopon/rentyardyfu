import { getRenewOrMoveOut } from "@/services/renewOrMoveOut/renewOrMoveOut";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const getRenewOrMoveOutSlice = createSlice({
  name: "getRenewOrMoveOut",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getRenewOrMoveOut.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getRenewOrMoveOut.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getRenewOrMoveOut.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getRenewOrMoveOutSlice.reducer;
