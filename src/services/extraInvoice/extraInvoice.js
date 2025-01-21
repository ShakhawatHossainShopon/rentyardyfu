import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getExtraInvoice = createAsyncThunk(
  "getExtraInvoice",
  async ({ date_to, date_from }) => {
    return await apiClient
      .get(
        `${apiEndPoints.EXTRA_INVOICE.EXTRA_INVOICE}?date_to=${
          date_to ? date_to : ""
        }&date_from=${date_from ? date_from : ""}`
      )
      .then((res) => res.data);
  }
);

export const addExtraInvoice = createAsyncThunk(
  "addExtraInvoice",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.EXTRA_INVOICE.EXTRA_INVOICE, data)
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
    dispatch(getExtraInvoice());
  }
);
