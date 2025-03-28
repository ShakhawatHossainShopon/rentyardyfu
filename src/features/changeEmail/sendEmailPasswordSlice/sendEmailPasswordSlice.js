import { changeEmail } from "@/services/auth/auth";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: "",
  email: "",
};

const sendEmailPasswordSlice = createSlice({
  name: "sendEmailPassword",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(changeEmail.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(changeEmail.fulfilled, (state, action) => {
      state.loading = false;
      state.email = action.payload.email;
      toast.success("Check Your Old Email for OTP");
      sessionStorage.setItem("otp_verifier", action.payload.otp_verifier);
    });
    builder.addCase(changeEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default sendEmailPasswordSlice.reducer;
