import { deletePackage } from "@/services/packages/packages";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deletePackageSlice = createSlice({
  name: "deletePackage",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deletePackage.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deletePackage.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deletePackage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deletePackageSlice.reducer;
