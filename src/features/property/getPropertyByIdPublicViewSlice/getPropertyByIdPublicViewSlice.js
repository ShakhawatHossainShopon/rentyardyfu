import { getPropertyByIdPublicView } from "@/services/property/property";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const getPropertyByIdPublicViewSlice = createSlice({
  name: "getPropertyByIdPublicView",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPropertyByIdPublicView.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPropertyByIdPublicView.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getPropertyByIdPublicView.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getPropertyByIdPublicViewSlice.reducer;
