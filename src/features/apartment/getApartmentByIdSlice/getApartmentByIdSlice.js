import { getApartmentById } from "@/services/apartment/apartment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const getApartmentByIdSlice = createSlice({
  name: "getApartmentById",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getApartmentById.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getApartmentById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getApartmentById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getApartmentByIdSlice.reducer;
