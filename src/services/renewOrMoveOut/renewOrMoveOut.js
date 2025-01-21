import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getRenewOrMoveOut = createAsyncThunk(
  "getRenewOrMoveOut",
  async () => {
    return await apiClient
      .get(apiEndPoints.RENEW_OR_MOVE_OUT.RENEW_OR_MOVE_OUT)
      .then((res) => res.data);
  }
);

export const addRenewOrMoveOut = createAsyncThunk(
  "addRenewOrMoveOut",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.RENEW_OR_MOVE_OUT.RENEW_OR_MOVE_OUT, data)
        .then((res) => {
          toast.success("Apply Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getRenewOrMoveOut());
  }
);

export const deleteRenewOrMoveOut = createAsyncThunk(
  "deleteRenewOrMoveOut",
  async ({ applicationId, type }, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(
          `${apiEndPoints.RENEW_OR_MOVE_OUT.RENEW_OR_MOVE_OUT}?applicationId=${
            applicationId ? applicationId : ""
          }&type=${type ? type : ""}`
        )
        .then((res) => {
          toast.success("Canceled!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getRenewOrMoveOut());
  }
);
