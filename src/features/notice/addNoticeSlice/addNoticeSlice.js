import { addNotice } from "@/services/notice/notice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addNoticeSlice = createSlice({
  name: "addNotice",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addNotice.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addNotice.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addNotice.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addNoticeSlice.reducer;
