import { updateInvoice } from "@/services/invoice/invoice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateInvoiceSlice = createSlice({
  name: "updateInvoice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateInvoice.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateInvoice.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateInvoiceSlice.reducer;
