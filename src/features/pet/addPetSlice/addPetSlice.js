import { addPet } from "@/services/pet/pet";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addPetSlice = createSlice({
  name: "addPet",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addPet.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addPet.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addPet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addPetSlice.reducer;
