import { deleteApartment } from "@/services/apartment/apartment";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deleteApartmentSlice = createSlice({
  name: "deleteApartment",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteApartment.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteApartment.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteApartment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deleteApartmentSlice.reducer;
