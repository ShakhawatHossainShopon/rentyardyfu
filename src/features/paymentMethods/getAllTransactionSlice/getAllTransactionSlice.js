import { getAllTransaction } from "@/services/paymentMethods/paymentMethods";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllTransactionSlice = createSlice({
  name: "getAllTransaction",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllTransaction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllTransaction.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllTransaction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllTransactionSlice.reducer;
