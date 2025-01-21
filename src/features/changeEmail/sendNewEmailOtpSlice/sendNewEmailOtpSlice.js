import { changeEmail } from "@/services/auth/auth";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: "",
};

const sendNewEmailOtpSlice = createSlice({
  name: "sendNewEmailOtp",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(changeEmail.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(changeEmail.fulfilled, (state) => {
      state.loading = false;
      toast.success(
        "Your email changed successfully! Now login with your new email"
      );
      sessionStorage.removeItem("otp_verifier");
    });
    builder.addCase(changeEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default sendNewEmailOtpSlice.reducer;
