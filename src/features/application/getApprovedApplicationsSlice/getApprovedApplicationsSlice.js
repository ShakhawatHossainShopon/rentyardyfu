import { getApprovedApplications } from "@/services/application/application";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getApprovedApplicationsSlice = createSlice({
  name: "getApprovedApplications",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getApprovedApplications.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getApprovedApplications.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getApprovedApplications.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getApprovedApplicationsSlice.reducer;
