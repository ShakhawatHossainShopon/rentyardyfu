import { getPetInfo } from "@/services/pet/pet";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const getPetInfoSlice = createSlice({
  name: "getPetInfo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPetInfo.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPetInfo.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getPetInfo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getPetInfoSlice.reducer;
