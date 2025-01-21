import { addApartment } from "@/services/apartment/apartment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addApartmentSlice = createSlice({
  name: "addApartment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addApartment.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addApartment.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addApartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addApartmentSlice.reducer;
