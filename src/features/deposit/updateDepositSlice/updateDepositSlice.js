import { updateDeposit } from "@/services/deposit/deposit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateDepositSlice = createSlice({
  name: "updateDeposit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateDeposit.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateDeposit.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateDeposit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateDepositSlice.reducer;
