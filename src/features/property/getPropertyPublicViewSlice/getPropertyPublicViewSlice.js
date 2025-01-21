import { getPropertyPublicView } from "@/services/property/property";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
  demo: "",
};

const getPropertyPublicViewSlice = createSlice({
  name: "getPropertyPublicView",
  initialState,
  reducers: {
    setSearchQueries: (state, action) => {
      state.searchQueries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPropertyPublicView.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPropertyPublicView.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getPropertyPublicView.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { setSearchQueries } = getPropertyPublicViewSlice.actions;
export default getPropertyPublicViewSlice.reducer;
