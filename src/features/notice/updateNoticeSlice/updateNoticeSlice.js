import { updateNotice } from "@/services/notice/notice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateNoticeSlice = createSlice({
  name: "updateNotice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateNotice.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateNotice.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateNotice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateNoticeSlice.reducer;
