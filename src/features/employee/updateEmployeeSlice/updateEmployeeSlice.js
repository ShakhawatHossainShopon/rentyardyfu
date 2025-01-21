import { updateEmployee } from "@/services/employee/employee";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateEmployeeSlice = createSlice({
  name: "updateEmployee",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateEmployee.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateEmployee.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateEmployeeSlice.reducer;
