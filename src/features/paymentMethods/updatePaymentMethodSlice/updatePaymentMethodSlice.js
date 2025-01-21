import { updatePaymentMethod } from "@/services/paymentMethods/paymentMethods";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updatePaymentMethodSlice = createSlice({
  name: "updatePaymentMethod",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updatePaymentMethod.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updatePaymentMethod.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePaymentMethod.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updatePaymentMethodSlice.reducer;
