import { updatePet } from "@/services/pet/pet";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updatePetSlice = createSlice({
  name: "updatePet",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updatePet.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updatePet.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updatePet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updatePetSlice.reducer;
