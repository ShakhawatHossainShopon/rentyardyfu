import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getApplicationListForPO } from "../application/application";

export const getAllInvoiceByPOForRenter = createAsyncThunk(
  "getAllInvoiceByPOForRenter",
  async ({ userId, applicationId }) => {
    return await apiClient
      .get(
        `${apiEndPoints.INVOICE.INVOICE}?userId=${
          userId ? userId : ""
        }&applicationId=${applicationId ? applicationId : ""}`
      )
      .then((res) => res.data);
  }
);

export const addInvoice = createAsyncThunk(
  "addInvoice",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.INVOICE.INVOICE, data)
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
    dispatch(getApplicationListForPO());
  }
);

export const updateInvoice = createAsyncThunk(
  "updateInvoice",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.INVOICE.INVOICE, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Invoice...",
      }
    );
    dispatch(getApplicationListForPO());
  }
);

export const deleteInvoice = createAsyncThunk(
  "deleteInvoice",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.INVOICE.INVOICE}?invoiceId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Invoice...",
      }
    );
    dispatch(getApplicationListForPO());
  }
);
