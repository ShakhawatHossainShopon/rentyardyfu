import { addPackage } from "@/services/packages/packages";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addPackageSlice = createSlice({
  name: "addPackage",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addPackage.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addPackage.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addPackage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addPackageSlice.reducer;
