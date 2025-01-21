import { addEmployee } from "@/services/employee/employee";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addEmployeeSlice = createSlice({
  name: "addEmployee",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addEmployee.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addEmployee.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addEmployeeSlice.reducer;
