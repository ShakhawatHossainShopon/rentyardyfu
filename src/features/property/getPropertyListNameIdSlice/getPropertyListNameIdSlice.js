import { getPropertyListNameId } from "@/services/property/property";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getPropertyListNameIdSlice = createSlice({
  name: "getPropertyListNameId",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPropertyListNameId.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPropertyListNameId.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getPropertyListNameId.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getPropertyListNameIdSlice.reducer;
