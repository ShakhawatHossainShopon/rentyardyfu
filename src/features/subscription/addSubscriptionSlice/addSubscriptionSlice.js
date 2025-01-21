import { addSubs } from "@/services/subscription/subscription";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addSubsSlice = createSlice({
  name: "addSubs",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addSubs.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addSubs.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addSubs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addSubsSlice.reducer;
