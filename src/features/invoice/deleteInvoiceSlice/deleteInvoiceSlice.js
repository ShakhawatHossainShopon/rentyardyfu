import { deleteInvoice } from "@/services/invoice/invoice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deleteInvoiceSlice = createSlice({
  name: "deleteInvoice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteInvoice.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteInvoice.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deleteInvoiceSlice.reducer;
