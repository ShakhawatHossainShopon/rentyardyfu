import { updateApplicationByPO } from "@/services/application/application";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateApplicationByPOSlice = createSlice({
  name: "updateApplicationByPO",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateApplicationByPO.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateApplicationByPO.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateApplicationByPO.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateApplicationByPOSlice.reducer;
