import { updateVehicle } from "@/services/vehicle/vehicle";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateVehicleSlice = createSlice({
  name: "updateVehicle",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateVehicle.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateVehicle.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateVehicle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateVehicleSlice.reducer;
