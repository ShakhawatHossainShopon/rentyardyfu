import { getApplicationListForPO } from "@/services/application/application";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getApplicationForPOSlice = createSlice({
  name: "getApplicationForPO",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getApplicationListForPO.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getApplicationListForPO.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getApplicationListForPO.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getApplicationForPOSlice.reducer;
