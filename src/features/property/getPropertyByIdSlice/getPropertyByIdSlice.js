import { getPropertyById } from "@/services/property/property";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const getPropertyByIdSlice = createSlice({
  name: "getPropertyById",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPropertyById.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPropertyById.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getPropertyById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getPropertyByIdSlice.reducer;
