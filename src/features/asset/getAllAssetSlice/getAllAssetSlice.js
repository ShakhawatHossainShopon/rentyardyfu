import { getAllAsset } from "@/services/asset/asset";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllAssetSlice = createSlice({
  name: "getAllAsset",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllAsset.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllAsset.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllAsset.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllAssetSlice.reducer;
