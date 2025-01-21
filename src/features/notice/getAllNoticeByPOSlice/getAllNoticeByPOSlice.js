import { getAllNoticeByPO } from "@/services/notice/notice";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllNoticeByPOSlice = createSlice({
  name: "getAllNoticeByPO",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllNoticeByPO.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllNoticeByPO.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllNoticeByPO.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllNoticeByPOSlice.reducer;
