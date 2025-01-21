import { getAllPetForPo } from "@/services/pet/pet";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllPetForPoSlice = createSlice({
  name: "getAllPetForPo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPetForPo.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllPetForPo.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllPetForPo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllPetForPoSlice.reducer;
