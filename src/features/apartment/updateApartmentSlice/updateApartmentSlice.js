import { updateApartment } from "@/services/apartment/apartment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateApartmentByIdSlice = createSlice({
  name: "updateApartmentById",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateApartment.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateApartment.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateApartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateApartmentByIdSlice.reducer;
