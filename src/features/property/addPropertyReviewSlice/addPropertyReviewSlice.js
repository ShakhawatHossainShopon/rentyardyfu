import { addPropertyReview } from "@/services/property/property";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addPropertyReviewSlice = createSlice({
  name: "addPropertyReview",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addPropertyReview.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addPropertyReview.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addPropertyReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addPropertyReviewSlice.reducer;
