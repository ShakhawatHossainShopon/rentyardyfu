import { updateNoticeVisibility } from "@/services/notice/notice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateNoticeVisibilitySlice = createSlice({
  name: "updateNoticeVisibility",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateNoticeVisibility.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateNoticeVisibility.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateNoticeVisibility.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateNoticeVisibilitySlice.reducer;
