import { addExtraInvoice } from "@/services/extraInvoice/extraInvoice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addExtraInvoiceSlice = createSlice({
  name: "addExtraInvoice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addExtraInvoice.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addExtraInvoice.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addExtraInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addExtraInvoiceSlice.reducer;
