import { deleteTour } from "@/services/tour/tour";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deleteTourByRenterSlice = createSlice({
  name: "deleteTourByRenter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteTour.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteTour.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTour.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deleteTourByRenterSlice.reducer;
