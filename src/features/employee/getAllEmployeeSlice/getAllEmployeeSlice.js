import { getAllEmployee } from "@/services/employee/employee";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllEmployeeSlice = createSlice({
  name: "getAllEmployee",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllEmployee.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllEmployee.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllEmployee.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllEmployeeSlice.reducer;
