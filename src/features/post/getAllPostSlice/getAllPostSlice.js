import { getAllPost } from "@/services/post/post";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllPostSlice = createSlice({
  name: "getAllPost",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllPost.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllPost.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllPost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllPostSlice.reducer;
