import { getAllApartment } from "@/services/apartment/apartment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  properties: [],
  error: "",
};

const getAllApartmentSlice = createSlice({
  name: "getAllApartment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllApartment.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllApartment.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data.updatedApartments;
      state.properties = action.payload.data.updatedProperties;
    });
    builder.addCase(getAllApartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllApartmentSlice.reducer;
