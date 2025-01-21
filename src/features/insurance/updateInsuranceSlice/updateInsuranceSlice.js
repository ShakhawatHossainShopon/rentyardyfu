import { updateInsurance } from "@/services/insurance/insurance";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateInsuranceSlice = createSlice({
  name: "updateInsurance",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateInsurance.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateInsurance.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateInsurance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateInsuranceSlice.reducer;
