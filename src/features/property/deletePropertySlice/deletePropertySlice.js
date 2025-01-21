import { deleteProperty } from "@/services/property/property";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deletePropertySlice = createSlice({
  name: "deleteProperty",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteProperty.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteProperty.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteProperty.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deletePropertySlice.reducer;
