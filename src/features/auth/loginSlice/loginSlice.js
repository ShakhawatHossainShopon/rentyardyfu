import { login } from "@/services/auth/auth";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: "",
  isToken: false,
  isAuthenticated: false,
  isPropertyOwner: false,
  isRenter: false,
  tempRenter: false,
  tempPo: false,
  verifier: false,
  email: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    tempRole: (state) => {
      state.tempRenter = false;
      state.tempPo = false;
    },
    loginVerifier: (state) => {
      state.verifier = false;
    },
    checkAuth: (state, action) => {
      if (action.payload.token && action.payload.role === "Renter") {
        state.isRenter = true;
        state.isPropertyOwner = false;
        state.isAuthenticated = true;
        state.isToken = true;
      }
      if (action.payload.token && action.payload.role === "PO") {
        state.isRenter = false;
        state.isPropertyOwner = true;
        state.isAuthenticated = true;
        state.isToken = true;
      }
    },
    logoutExtra: (state) => {
      state.isToken = false;
      state.isAuthenticated = false;
      state.isPropertyOwner = false;
      state.isRenter = false;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(login.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        toast.success("Login successful");
        if (action.payload.token) {
          localStorage.setItem("token", action.payload.token);
          state.isToken = true;
        }
        if (
          action.payload.role === "Renter" ||
          action.payload.role === "Co-Applicant"
        ) {
          localStorage.setItem("role", "Renter");
          state.isRenter = true;
          state.isPropertyOwner = false;
          state.tempRenter = true;
        }
        if (action.payload.role === "PO") {
          localStorage.setItem("role", action.payload.role);
          state.isPropertyOwner = true;
          state.isRenter = false;
          state.tempPo = true;
        }
        state.isAuthenticated = true;
        state.loading = false;
      } else if (action.payload.response.status === 401) {
        state.email = action.payload.response.data.email;
        state.verifier = true;
        sessionStorage.setItem(
          "verifier",
          action.payload.response.data.otp_verifier
        );
        toast.info("Please enter your OTP");
        state.error = "Verification code sent to your registered mobile number";
      }
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { checkAuth, logoutExtra, tempRole, loginVerifier } =
  loginSlice.actions;
export default loginSlice.reducer;
