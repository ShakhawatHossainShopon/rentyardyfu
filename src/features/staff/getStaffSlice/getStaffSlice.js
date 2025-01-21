import { getStaff } from "@/services/staff/staff";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getStaffSlice = createSlice({
  name: "getStaff",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getStaff.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getStaffSlice.reducer;
