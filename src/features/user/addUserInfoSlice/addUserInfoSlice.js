import { addUser } from "@/services/user/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addUserInfoSlice = createSlice({
  name: "addUserInfo",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addUserInfoSlice.reducer;
