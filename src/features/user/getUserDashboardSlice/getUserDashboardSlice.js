import { getUserDashboard } from "@/services/user/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const getUserDashboardSlice = createSlice({
  name: "getUserDashboard",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getUserDashboard.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUserDashboard.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getUserDashboard.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getUserDashboardSlice.reducer;
