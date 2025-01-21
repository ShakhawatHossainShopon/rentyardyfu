import { deleteAsset } from "@/services/asset/asset";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deleteAssetSlice = createSlice({
  name: "deleteAsset",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteAsset.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteAsset.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteAsset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deleteAssetSlice.reducer;
