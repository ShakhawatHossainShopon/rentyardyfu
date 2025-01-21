import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getUser = createAsyncThunk("getUser", async () => {
  return await apiClient.get(apiEndPoints.USER.USER).then((res) => res.data);
});

export const getUserDashboard = createAsyncThunk(
  "getUserDashboard",
  async (applicationId) => {
    return await apiClient
      .get(`${apiEndPoints.USER.USER_DASHBOARD}?applicationId=${applicationId}`)
      .then((res) => res.data);
  }
);

export const addUser = createAsyncThunk(
  "getUser",
  async (data, { dispatch }) => {
    await await toast.promise(
      apiClient
        .put(apiEndPoints.USER.USER, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating User Info...",
      }
    );
    dispatch(getUser());
  }
);

export const payUserBill = createAsyncThunk(
  "payUserBill",
  async (data, { dispatch }) => {
    await await toast.promise(
      apiClient
        .post(apiEndPoints.USER.USER_BILL, data)
        .then((res) => {
          toast.success(res.data.message);
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getUser());
    dispatch(getUserDashboard());
  }
);

export const addPoUser = createAsyncThunk(
  "addPoUser",
  async (data, { dispatch }) => {
    await await toast.promise(
      apiClient
        .put(apiEndPoints.USER.USER_PO, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating User Info...",
      }
    );
    dispatch(getUser());
  }
);

export const addAutoPay = createAsyncThunk(
  "addAutoPay",
  async (data, { dispatch }) => {
    await await toast.promise(
      apiClient
        .put(apiEndPoints.USER.USER_AUTO_PAY, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getUser());
  }
);
