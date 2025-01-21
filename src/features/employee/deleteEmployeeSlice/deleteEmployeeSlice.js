import { deleteEmployee } from "@/services/employee/employee";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deleteEmployeeSlice = createSlice({
  name: "deleteEmployee",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteEmployee.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteEmployee.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deleteEmployeeSlice.reducer;
