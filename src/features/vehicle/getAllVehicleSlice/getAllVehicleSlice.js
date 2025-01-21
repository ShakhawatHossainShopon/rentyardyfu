import { getAllVehicle } from "@/services/vehicle/vehicle";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllVehicleSlice = createSlice({
  name: "getAllVehicle",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllVehicle.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllVehicle.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllVehicle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllVehicleSlice.reducer;
