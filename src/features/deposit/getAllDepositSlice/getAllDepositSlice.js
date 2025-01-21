import { getAllDeposit } from "@/services/deposit/deposit";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllDepositSlice = createSlice({
  name: "getAllDeposit",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllDeposit.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllDeposit.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllDeposit.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllDepositSlice.reducer;
