import { deletePaymentMethod } from "@/services/paymentMethods/paymentMethods";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deletePaymentMethodSlice = createSlice({
  name: "deletePaymentMethod",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deletePaymentMethod.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deletePaymentMethod.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deletePaymentMethod.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deletePaymentMethodSlice.reducer;
