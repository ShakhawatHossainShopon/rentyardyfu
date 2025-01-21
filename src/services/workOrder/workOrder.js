import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllWorkOrder = createAsyncThunk("getAllWorkOrder", async () => {
  return await apiClient
    .get(apiEndPoints.WORK_ORDER.WORK_ORDER)
    .then((res) => res.data);
});

export const getAllWorkOrderByPO = createAsyncThunk(
  "getAllWorkOrderByPO",
  async () => {
    return await apiClient
      .get(apiEndPoints.WORK_ORDER.PROPERTY)
      .then((res) => res.data);
  }
);

export const addWorkOrder = createAsyncThunk(
  "addWorkOrder",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.WORK_ORDER.WORK_ORDER, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Work Order...",
      }
    );
    dispatch(getAllWorkOrder());
  }
);

export const updateWorkOrder = createAsyncThunk(
  "updateWorkOrder",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.WORK_ORDER.WORK_ORDER, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Work Order...",
      }
    );
    dispatch(getAllWorkOrderByPO());
  }
);

export const assignProvider = createAsyncThunk(
  "assignProvider",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.WORK_ORDER.ASSIGN_PROVIDER, data)
        .then((res) => {
          toast.success("Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getAllWorkOrderByPO());
  }
);
