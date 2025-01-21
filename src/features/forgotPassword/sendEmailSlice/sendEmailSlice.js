import { forgotPassword } from "@/services/auth/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  email: "",
};

const sendEmailSlice = createSlice({
  name: "sendEmail",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.email = action.payload.email; // Set the email for successful response
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default sendEmailSlice.reducer;
