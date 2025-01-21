import { addTour } from "@/services/tour/tour";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addTourSlice = createSlice({
  name: "addTour",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addTour.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addTour.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addTour.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addTourSlice.reducer;
