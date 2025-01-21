import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getStaff = createAsyncThunk(
  "getStaff",
  async ({ staffId, role }) => {
    return await apiClient
      .get(`${apiEndPoints.STAFF.STAFF}?staffId=${staffId}&role=${role}`)
      .then((res) => res.data);
  }
);

export const addStaff = createAsyncThunk(
  "addStaff",
  async ({ data, role }, { dispatch }) => {
    console.log(data);
    await toast.promise(
      apiClient
        .post(apiEndPoints.STAFF.STAFF, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending",
      }
    );
    dispatch(getStaff({ staffId: "", role: role }));
  }
);

export const updateStaff = createAsyncThunk(
  "updateStaff",
  async ({ data, role }, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.STAFF.STAFF, data)
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
    dispatch(getStaff({ staffId: "", role: role }));
  }
);

export const deleteStaff = createAsyncThunk(
  "deleteStaff",
  async ({ data, role }, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.STAFF.STAFF}?staffId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getStaff({ staffId: "", role: role }));
  }
);
