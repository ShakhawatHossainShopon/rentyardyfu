import { deletePet } from "@/services/pet/pet";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deletePetSlice = createSlice({
  name: "deletePet",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deletePet.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deletePet.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deletePet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deletePetSlice.reducer;
