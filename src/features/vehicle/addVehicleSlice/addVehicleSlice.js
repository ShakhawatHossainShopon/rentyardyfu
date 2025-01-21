import { addVehicle } from "@/services/vehicle/vehicle";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addVehicleSlice = createSlice({
  name: "addVehicle",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addVehicle.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addVehicle.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addVehicle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addVehicleSlice.reducer;
