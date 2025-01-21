import { getAllPaymentMethods } from "@/services/paymentMethods/paymentMethods";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllPaymentMethodsSlice = createSlice({
  name: "getAllPaymentMethods",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPaymentMethods.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllPaymentMethods.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllPaymentMethods.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllPaymentMethodsSlice.reducer;
