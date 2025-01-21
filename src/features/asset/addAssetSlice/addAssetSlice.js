import { addAsset } from "@/services/asset/asset";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  load: false,
  error: "",
};

const addAssetSlice = createSlice({
  name: "addAsset",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addAsset.pending, (state) => {
      state.load = true;
      state.error = "";
    });
    builder.addCase(addAsset.fulfilled, (state) => {
      state.load = false;
    });
    builder.addCase(addAsset.rejected, (state, action) => {
      state.load = false;
      state.error = action.error.message;
    });
  },
});

export default addAssetSlice.reducer;
