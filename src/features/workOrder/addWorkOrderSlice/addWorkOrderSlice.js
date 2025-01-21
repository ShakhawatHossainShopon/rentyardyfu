import { addWorkOrder } from "@/services/workOrder/workOrder";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addWorkOrderSlice = createSlice({
  name: "addWorkOrder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addWorkOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addWorkOrder.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addWorkOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addWorkOrderSlice.reducer;
