import { getAllTransactionForRenter } from "@/services/paymentMethods/paymentMethods";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllTransactionForRenterSlice = createSlice({
  name: "getAllTransactionForRenter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllTransactionForRenter.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllTransactionForRenter.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllTransactionForRenter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllTransactionForRenterSlice.reducer;
