import { getPaidParkingForRenter } from "@/services/paidParking/paidParking";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getPaidParkingForRenterSlice = createSlice({
  name: "getPaidParkingForRenter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPaidParkingForRenter.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPaidParkingForRenter.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getPaidParkingForRenter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getPaidParkingForRenterSlice.reducer;
