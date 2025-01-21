import { getAllProperty } from "@/services/property/property";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cities: [],
  countries: [],
  updatedProperties: [],
  error: "",
};

const getAllPropertySlice = createSlice({
  name: "getAllProperty",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllProperty.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.cities = action.payload.data.cities;
      state.countries = action.payload.data.countries;
      state.updatedProperties = action.payload.data.updatedProperties;
    });
    builder.addCase(getAllProperty.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllPropertySlice.reducer;
