import { addPaymentMethod } from "@/services/paymentMethods/paymentMethods";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addPaymentMethodSlice = createSlice({
  name: "addPaymentMethod",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addPaymentMethod.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addPaymentMethod.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addPaymentMethod.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addPaymentMethodSlice.reducer;
