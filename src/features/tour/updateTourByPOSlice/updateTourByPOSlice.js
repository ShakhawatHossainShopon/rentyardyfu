import { updateTourByPO } from "@/services/tour/tour";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateTourByPOSlice = createSlice({
  name: "updateTourByPO",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateTourByPO.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateTourByPO.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateTourByPO.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateTourByPOSlice.reducer;
