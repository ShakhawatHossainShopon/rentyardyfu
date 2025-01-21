import { signUp } from "@/services/auth/auth";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  data: {},
  error: "",
  verifier: false,
  email: "",
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    signUpVerifier: (state) => {
      state.verifier = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.success = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      sessionStorage.setItem("verifier", action.payload.otp_verifier);
      state.email = action.payload.email;
      state.verifier = true;
      toast.info("Please enter your OTP");
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
      state.success = false;
    });
  },
});
export const { signUpVerifier } = signUpSlice.actions;
export default signUpSlice.reducer;
