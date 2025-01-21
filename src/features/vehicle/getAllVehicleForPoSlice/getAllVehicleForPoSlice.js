import { getAllVehicleForPo } from "@/services/vehicle/vehicle";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllVehicleForPoSlice = createSlice({
  name: "getAllVehicleForPo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllVehicleForPo.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllVehicleForPo.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllVehicleForPo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllVehicleForPoSlice.reducer;
