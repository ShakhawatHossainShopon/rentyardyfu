import { getAllInvoiceByPOForRenter } from "@/services/invoice/invoice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getInvoiceByPOForRenterSlice = createSlice({
  name: "getInvoiceByPOForRenter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllInvoiceByPOForRenter.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllInvoiceByPOForRenter.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllInvoiceByPOForRenter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getInvoiceByPOForRenterSlice.reducer;
