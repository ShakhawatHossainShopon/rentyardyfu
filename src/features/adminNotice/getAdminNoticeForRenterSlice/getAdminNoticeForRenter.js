import { getAdminNoticeForRenter } from "@/services/adminNotice/adminNotice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: "",
};

const getAdminNoticeForRenterSlice = createSlice({
  name: "getAdminNoticeForRenter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAdminNoticeForRenter.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAdminNoticeForRenter.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAdminNoticeForRenter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAdminNoticeForRenterSlice.reducer;
