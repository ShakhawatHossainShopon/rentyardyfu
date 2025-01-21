import { getTourForRenter } from "@/services/tour/tour";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getTourForRenterSlice = createSlice({
  name: "getTourForRenter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTourForRenter.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getTourForRenter.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getTourForRenter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getTourForRenterSlice.reducer;
