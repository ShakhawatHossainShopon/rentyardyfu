import { getAllWorkOrder } from "@/services/workOrder/workOrder";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllWorkOrderSlice = createSlice({
  name: "getAllWorkOrder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllWorkOrder.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllWorkOrder.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllWorkOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllWorkOrderSlice.reducer;
