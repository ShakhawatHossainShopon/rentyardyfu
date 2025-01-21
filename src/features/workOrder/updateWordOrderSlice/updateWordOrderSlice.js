import { updateWorkOrder } from "@/services/workOrder/workOrder";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateWorkOrderSlice = createSlice({
  name: "updateWorkOrder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateWorkOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateWorkOrder.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateWorkOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateWorkOrderSlice.reducer;
