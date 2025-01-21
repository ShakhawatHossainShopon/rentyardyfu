import { getPost } from "@/services/post/post";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getPostSlice = createSlice({
  name: "getPost",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getPost.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getPost.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getPostSlice.reducer;
