import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllPackages = createAsyncThunk("getAllPackages", async () => {
  return await apiClient.get(apiEndPoints.MAIL.MAIL).then((res) => res.data);
});

export const addPackage = createAsyncThunk(
  "addPackage",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.MAIL.MAIL, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Package...",
      }
    );
    dispatch(getAllPackages());
  }
);

export const updatePackage = createAsyncThunk(
  "updatePackage",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.MAIL.MAIL, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Package...",
      }
    );
    dispatch(getAllPackages());
  }
);

export const deletePackage = createAsyncThunk(
  "deletePackage",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.MAIL.MAIL}?mailId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Package...",
      }
    );
    dispatch(getAllPackages());
  }
);
