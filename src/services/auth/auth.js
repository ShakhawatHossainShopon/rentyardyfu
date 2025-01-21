import { setTabValue } from "@/features/auth/changeTabSlice/changeTabSlice";
import {
  loginVerifier,
  logoutExtra,
} from "@/features/auth/loginSlice/loginSlice";
import { signUpVerifier } from "@/features/auth/signUpSlice/signUpSlice";
import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const signUp = createAsyncThunk("signUp", async (data) => {
  return await toast.promise(
    apiClient
      .post(apiEndPoints.AUTH.SIGN_UP, data)
      .then((res) => {
        // toast.success("Sign Up Successful!");
        return res.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      }),
    {
      pending: "Signing Up...",
    }
  );
});

export const login = createAsyncThunk("login", async (data, { dispatch }) => {
  return await toast.promise(
    apiClient
      .post(apiEndPoints.AUTH.LOGIN, data)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        dispatch(signUpVerifier());
        if (err.response.data.status !== 401) {
          toast.error(err.response.data.message);
        }
        return err;
      }),
    {
      pending: "Logging in...",
    }
  );
});

export const logout = createAsyncThunk("logout", async (data, { dispatch }) => {
  dispatch(logoutExtra());
  toast.success("Logout Successful!");
});

export const otp = createAsyncThunk("otp", async (data, { dispatch }) => {
  return await toast.promise(
    apiClient.post(apiEndPoints.AUTH.OTP, data).then((res) => {
      dispatch(setTabValue("login"));
      dispatch(loginVerifier());
      dispatch(signUpVerifier());
      return res.data;
    }),
    {
      pending: "Verifying OTP...",
      success: "OTP Verified!, Please log in",
      error: "Wrong Otp, submit again",
    }
  );
});

export const changePassword = createAsyncThunk(
  "changePassword",
  async (data, { dispatch }) => {
    return await toast.promise(
      apiClient
        .post(apiEndPoints.AUTH.CHANGE_PASSWORD, data)
        .then((res) => {
          toast.success(
            "Password Changed Successfully, login with your new password!"
          );
          dispatch(logoutExtra());
          return res.data;
        })
        .catch((err) => {
          if (err.response.data.status_code === 400) {
            toast.error("Password must be 6 characters long");
          }
          toast.error(err.response.data.message);
        }),
      {
        pending: "Changing Password...",
      }
    );
  }
);

export const forgotPassword = createAsyncThunk(
  "forgotPassword",
  async (data) => {
    return await toast.promise(
      apiClient
        .post(apiEndPoints.AUTH.FORGOT_PASSWORD, data)
        .then((res) => {
          toast.success("Check your email for OTP");
          sessionStorage.setItem("otp_verifier", res.data.otp_verifier);
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
  }
);

export const forgotPassOTP = createAsyncThunk("forgotPassOTP", async (data) => {
  return await toast.promise(
    apiClient
      .post(apiEndPoints.AUTH.FORGOT_PASS_OTP, data)
      .then((res) => {
        toast.success("Enter your new password");
        sessionStorage.setItem("otp_verifier", res.data.otp_verifier);
        return res.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        return Promise.reject(err);
      }),
    {
      pending: "Pending...",
    }
  );
});

export const setNewPass = createAsyncThunk("setNewPass", async (data) => {
  return await toast.promise(
    apiClient
      .post(apiEndPoints.AUTH.SET_NEW_PASS, data)
      .then((res) => {
        toast.success("Password Changed Successfully");
        return res.data;
      })
      .catch((err) => {
        if (err.response.data.status_code === 400) {
          if (
            err.response.data.message !==
            "New password and confirm password do not match"
          ) {
            toast.error("Password must be at least 6 characters long");
          }
        }
        toast.error(err.response.data.message);
        return Promise.reject(err);
      }),
    {
      pending: "Pending...",
    }
  );
});

export const changeEmail = createAsyncThunk("changeEmail", async (data) => {
  return await toast.promise(
    apiClient
      .put(apiEndPoints.USER.CHANGE_EMAIL, data)
      .then((res) => res.data)
      .catch(
        (err) => {
          toast.error(err.response.data.message);
          return Promise.reject(err);
        },
        {
          pending: "Pending...",
        }
      )
  );
});
