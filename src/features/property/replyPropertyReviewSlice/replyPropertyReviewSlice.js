import { replyPropertyReview } from "@/services/property/property";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const replyPropertyReviewSlice = createSlice({
  name: "replyPropertyReview",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(replyPropertyReview.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(replyPropertyReview.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(replyPropertyReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default replyPropertyReviewSlice.reducer;
