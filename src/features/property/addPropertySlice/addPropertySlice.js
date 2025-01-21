import { addProperty } from "@/services/property/property";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addPropertySlice = createSlice({
  name: "addProperty",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addProperty.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addProperty.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addProperty.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addPropertySlice.reducer;
