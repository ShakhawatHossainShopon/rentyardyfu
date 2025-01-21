import { getApplicationForRenter } from "@/services/application/application";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getApplicationForRenterSlice = createSlice({
  name: "getApplicationForRenter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getApplicationForRenter.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getApplicationForRenter.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getApplicationForRenter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getApplicationForRenterSlice.reducer;
