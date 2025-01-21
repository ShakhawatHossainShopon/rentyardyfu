import { addApplication } from "@/services/application/application";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addApplicationSlice = createSlice({
  name: "addApplication",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addApplication.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addApplication.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addApplication.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addApplicationSlice.reducer;
