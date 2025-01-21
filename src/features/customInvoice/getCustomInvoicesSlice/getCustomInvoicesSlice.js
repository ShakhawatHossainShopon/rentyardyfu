import { getCustomInvoices } from "@/services/customInvoice/customInvoice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getCustomInvoicesSlice = createSlice({
  name: "getCustomInvoices",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getCustomInvoices.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getCustomInvoices.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getCustomInvoices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getCustomInvoicesSlice.reducer;
