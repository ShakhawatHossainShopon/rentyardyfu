import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getApprovedApplications } from "../application/application";
import { getUser } from "../user/user";

export const getApplicationFee = createAsyncThunk(
  "getApplicationFee",
  async (data) => {
    return await apiClient
      .get(`${apiEndPoints.APPLICATION_FEE.APPLICATION_FEE}?propertyId=${data}`)
      .then((res) => res.data);
  }
);

export const AddApplicationApprovalPayment = createAsyncThunk(
  "AddApplicationApprovalPayment",
  async (data, { dispatch }) => {
    return await toast.promise(
      apiClient
        .post(apiEndPoints.APPLICATION_FEE.APPLICATION_APPROVAL_PAYMENT, data)
        .then((res) => {
          toast.success(res.data.message);
          dispatch(getUser());
          dispatch(getApprovedApplications());
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
