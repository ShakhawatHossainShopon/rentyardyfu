import { getTourListForPO } from "@/services/tour/tour";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getTourForPOSlice = createSlice({
  name: "getTourForPO",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTourListForPO.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getTourListForPO.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getTourListForPO.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getTourForPOSlice.reducer;
