import { getExtraInvoice } from "@/services/extraInvoice/extraInvoice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getExtraInvoiceSlice = createSlice({
  name: "getExtraInvoice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getExtraInvoice.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getExtraInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getExtraInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getExtraInvoiceSlice.reducer;
