import { getAllPet } from "@/services/pet/pet";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllPetSlice = createSlice({
  name: "getAllPet",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPet.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllPet.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllPet.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllPetSlice.reducer;
