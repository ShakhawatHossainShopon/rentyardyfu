import { getAllPackages } from "@/services/packages/packages";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllPackageSlice = createSlice({
  name: "getAllPackage",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPackages.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllPackages.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllPackages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllPackageSlice.reducer;
