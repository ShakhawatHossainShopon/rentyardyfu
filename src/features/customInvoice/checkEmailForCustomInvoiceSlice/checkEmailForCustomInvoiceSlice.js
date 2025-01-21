import { checkEmailForCustomInvoice } from "@/services/customInvoice/customInvoice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const checkEmailForCustomInvoiceSlice = createSlice({
  name: "checkEmailForCustomInvoice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(checkEmailForCustomInvoice.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(checkEmailForCustomInvoice.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(checkEmailForCustomInvoice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default checkEmailForCustomInvoiceSlice.reducer;
