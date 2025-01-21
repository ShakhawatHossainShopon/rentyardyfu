import { updatePackage } from "@/services/packages/packages";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updatePackageSlice = createSlice({
  name: "updatePackage",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updatePackage.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updatePackage.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePackage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updatePackageSlice.reducer;
