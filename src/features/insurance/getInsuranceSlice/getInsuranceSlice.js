import { getInsurance } from "@/services/insurance/insurance";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const getInsuranceSlice = createSlice({
  name: "getInsurance",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getInsurance.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getInsurance.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getInsurance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getInsuranceSlice.reducer;
