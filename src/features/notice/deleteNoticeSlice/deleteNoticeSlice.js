import { deleteNotice } from "@/services/notice/notice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deleteNoticeSlice = createSlice({
  name: "deleteNotice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteNotice.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteNotice.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteNotice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deleteNoticeSlice.reducer;
