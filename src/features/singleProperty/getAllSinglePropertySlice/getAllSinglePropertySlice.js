import { getAllSingleProperty } from "@/services/singleProperty/singleProperty";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  cities: [],
  countries: [],
  updatedProperties: [],
  error: "",
};

const getAllSinglePropertySlice = createSlice({
  name: "getAllSingleProperty",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllSingleProperty.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllSingleProperty.fulfilled, (state, action) => {
      state.loading = false;
      state.cities = action.payload.data.cities;
      state.countries = action.payload.data.countries;
      state.updatedProperties = action.payload.data.updatedProperties;
    });
    builder.addCase(getAllSingleProperty.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllSinglePropertySlice.reducer;
