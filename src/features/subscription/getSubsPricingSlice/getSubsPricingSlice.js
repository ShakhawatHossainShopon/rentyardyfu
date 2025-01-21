import { getSubsPricing } from "@/services/subscription/subscription";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  data: {},
};

const getSubsPricingSlice = createSlice({
  name: "getSubsPricing",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getSubsPricing.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getSubsPricing.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getSubsPricing.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getSubsPricingSlice.reducer;
