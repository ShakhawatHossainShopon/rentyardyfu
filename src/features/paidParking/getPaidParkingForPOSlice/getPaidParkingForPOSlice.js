import { getPaidParkingForPO } from "@/services/paidParking/paidParking";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getPaidParkingForPOSlice = createSlice({
  name: "getPaidParkingForPO",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPaidParkingForPO.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPaidParkingForPO.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getPaidParkingForPO.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getPaidParkingForPOSlice.reducer;
