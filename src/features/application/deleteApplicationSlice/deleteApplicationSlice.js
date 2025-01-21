import { deleteApplication } from "@/services/application/application";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deleteApplicationByRenterSlice = createSlice({
  name: "deleteApplicationByRenter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteApplication.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteApplication.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deleteApplicationByRenterSlice.reducer;
