import { addInvoice } from "@/services/invoice/invoice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addInvoiceSlice = createSlice({
  name: "addInvoice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addInvoice.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addInvoice.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addInvoiceSlice.reducer;
