import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getCustomInvoices = createAsyncThunk(
  "getCustomInvoices",
  async () => {
    return await apiClient
      .get(apiEndPoints.CUSTOM_INVOICE.CUSTOM_INVOICE)
      .then((res) => res.data);
  }
);

export const checkEmailForCustomInvoice = createAsyncThunk(
  "checkEmailForCustomInvoice",
  async ({ email }) => {
    return await apiClient
      .get(
        `${apiEndPoints.CUSTOM_INVOICE.CUSTOM_INVOICE_CHECK_EMAIL}?email=${email}`
      )
      .then((res) => res.data);
  }
);

export const addCustomInvoice = createAsyncThunk(
  "addCustomInvoice",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.CUSTOM_INVOICE.CUSTOM_INVOICE, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Invoice...",
      }
    );
    dispatch(getCustomInvoices());
  }
);
