import { getApplicationFee } from "@/services/applicationFee/applicationFee";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const getApplicationFeeSlice = createSlice({
  name: "getApplicationFee",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getApplicationFee.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getApplicationFee.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getApplicationFee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getApplicationFeeSlice.reducer;
