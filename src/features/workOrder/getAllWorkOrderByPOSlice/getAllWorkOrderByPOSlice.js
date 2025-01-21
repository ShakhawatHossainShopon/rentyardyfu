import { getAllWorkOrderByPO } from "@/services/workOrder/workOrder";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllWorkOrderByPOSlice = createSlice({
  name: "getAllWorkOrderByPO",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllWorkOrderByPO.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllWorkOrderByPO.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllWorkOrderByPO.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllWorkOrderByPOSlice.reducer;
