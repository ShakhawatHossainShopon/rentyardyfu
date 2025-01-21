import { deleteVehicle } from "@/services/vehicle/vehicle";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deleteVehicleSlice = createSlice({
  name: "deleteVehicle",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteVehicle.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteVehicle.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteVehicle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deleteVehicleSlice.reducer;
