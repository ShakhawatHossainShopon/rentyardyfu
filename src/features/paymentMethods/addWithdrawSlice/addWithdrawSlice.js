import { withdrawAmount } from "@/services/paymentMethods/paymentMethods";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  isSuccess: false,
};

const addWithdrawSlice = createSlice({
  name: "addWithdraw",
  initialState,
  reducers: {
    setIsSuccess: (state, action) => {
      state.isSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(withdrawAmount.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(withdrawAmount.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(withdrawAmount.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.isSuccess = false;
    });
  },
});
export const { setIsSuccess } = addWithdrawSlice.actions;
export default addWithdrawSlice.reducer;
