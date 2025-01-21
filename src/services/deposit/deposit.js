import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllDeposit = createAsyncThunk(
  "getAllDeposit",
  async ({ propertyId, user }) => {
    return await apiClient
      .get(
        `${apiEndPoints.DEPOSIT.DEPOSIT}?propertyId=${propertyId}&user=${
          user ? user : ""
        }`
      )
      .then((res) => res.data);
  }
);

export const updateDeposit = createAsyncThunk(
  "updateDeposit",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.DEPOSIT.DEPOSIT, data)
        .then((res) => {
          toast.success("Refund Successfully updated");
          return res.data;
        })
        .catch((err) => {
          toast.info(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getAllDeposit());
  }
);
