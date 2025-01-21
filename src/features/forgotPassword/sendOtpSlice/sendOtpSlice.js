import { forgotPassOTP } from "@/services/auth/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
  success: false,
};

const sendOtpSlice = createSlice({
  name: "sendOtp",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(forgotPassOTP.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(forgotPassOTP.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(forgotPassOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default sendOtpSlice.reducer;
