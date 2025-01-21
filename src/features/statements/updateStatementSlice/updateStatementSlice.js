import { updateStatement } from "@/services/statements/statements";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateStatementSlice = createSlice({
  name: "updateStatement",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateStatement.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateStatement.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateStatement.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateStatementSlice.reducer;
