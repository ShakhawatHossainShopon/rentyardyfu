import { addInsurance } from "@/services/insurance/insurance";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addInsuranceSlice = createSlice({
  name: "addInsurance",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addInsurance.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addInsurance.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addInsurance.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addInsuranceSlice.reducer;
