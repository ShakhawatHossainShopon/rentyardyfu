import { addPaidParking } from "@/services/paidParking/paidParking";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addPaidParkingSlice = createSlice({
  name: "addPaidParking",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addPaidParking.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addPaidParking.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addPaidParking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addPaidParkingSlice.reducer;
