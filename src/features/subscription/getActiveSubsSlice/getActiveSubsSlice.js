import { getActiveSubs } from "@/services/subscription/subscription";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  data: [],
};

const getActiveSubsSlice = createSlice({
  name: "getActiveSubs",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getActiveSubs.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getActiveSubs.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getActiveSubs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getActiveSubsSlice.reducer;
