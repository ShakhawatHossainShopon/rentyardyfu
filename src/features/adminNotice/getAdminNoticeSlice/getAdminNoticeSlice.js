import { getAdminNotice } from "@/services/adminNotice/adminNotice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: "",
};

const getAdminNoticeSlice = createSlice({
  name: "getAdminNotice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAdminNotice.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAdminNotice.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAdminNotice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAdminNoticeSlice.reducer;
