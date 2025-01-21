import { getAllWithdrawnRequestList } from "@/services/paymentMethods/paymentMethods";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllWithdrawnSlice = createSlice({
  name: "getAllWithdrawn",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllWithdrawnRequestList.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllWithdrawnRequestList.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllWithdrawnRequestList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllWithdrawnSlice.reducer;
