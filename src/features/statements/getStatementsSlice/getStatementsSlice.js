import { getStatements } from "@/services/statements/statements";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getStatementsSlice = createSlice({
  name: "getStatements",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getStatements.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getStatements.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getStatements.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getStatementsSlice.reducer;
