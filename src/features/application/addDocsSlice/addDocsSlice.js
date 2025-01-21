import { addDocs } from "@/services/application/application";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addDocsSlice = createSlice({
  name: "addDocs",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addDocs.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addDocs.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addDocs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addDocsSlice.reducer;
