import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllAsset = createAsyncThunk("getAllAsset", async () => {
  return await apiClient.get(apiEndPoints.ASSET.ASSET).then((res) => res.data);
});

export const addAsset = createAsyncThunk(
  "addAsset",
  async (data, { dispatch }) => {
    return await toast.promise(
      apiClient
        .post(apiEndPoints.ASSET.ASSET, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            enctype: "multipart/form-data",
          },
        })
        .then((res) => {
          dispatch(getAllAsset());
          return res.data;
        }),
      {
        pending: "Adding Asset...",
        success: "Add Successful!",
        error: "Add failed!",
      }
    );
  }
);

export const deleteAsset = createAsyncThunk(
  "deleteAsset",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.ASSET.DELETE}?assetId=${data}`)
        .then((res) => res.data),
      {
        pending: "Deleting Asset...",
        success: "Delete Successful!",
        error: "Delete failed!",
      }
    );
    dispatch(getAllAsset());
  }
);
