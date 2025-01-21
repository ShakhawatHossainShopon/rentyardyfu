import { getAllNoticeByRenter } from "@/services/notice/notice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllNoticeByRenterSlice = createSlice({
  name: "getAllNoticeByRenter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllNoticeByRenter.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllNoticeByRenter.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllNoticeByRenter.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllNoticeByRenterSlice.reducer;
