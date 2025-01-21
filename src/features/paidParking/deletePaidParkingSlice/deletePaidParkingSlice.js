import { deletePaidParking } from "@/services/paidParking/paidParking";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deletePaidParkingSlice = createSlice({
  name: "deletePaidParking",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deletePaidParking.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deletePaidParking.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deletePaidParking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deletePaidParkingSlice.reducer;
