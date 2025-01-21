import { otp } from "@/services/auth/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
  success: false,
};

const otpSlice = createSlice({
  name: "otp",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(otp.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = false;
    });
    builder.addCase(otp.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.success = true;
      sessionStorage.removeItem("verifier");
    });
    builder.addCase(otp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
    });
  },
});

export default otpSlice.reducer;
