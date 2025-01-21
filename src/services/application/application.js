import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUser } from "../user/user";

export const getApplicationForRenter = createAsyncThunk(
  "getApplicationForRenter",
  async () => {
    return await apiClient
      .get(apiEndPoints.APPLICATION.APPLICATION)
      .then((res) => res.data);
  }
);

export const getApprovedApplications = createAsyncThunk(
  "getApprovedApplications",
  async () => {
    return await apiClient
      .get(apiEndPoints.APPLICATION.APPROVED)
      .then((res) => res.data);
  }
);

export const getApplicationListForPO = createAsyncThunk(
  "getApplicationListForPO",
  async () => {
    return await apiClient
      .get(apiEndPoints.APPLICATION.PROPERTY)
      .then((res) => res.data);
  }
);

export const addApplication = createAsyncThunk(
  "addApplication",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.APPLICATION.APPLICATION, data)
        .then((res) => {
          toast.success("Apply Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Applying For Rent...",
      }
    );
    dispatch(getApplicationForRenter());
  }
);
export const addDocs = createAsyncThunk(
  "addDocs",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.APPLICATION.DOCS, data)
        .then((res) => {
          toast.success("Document Added!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getApplicationListForPO());
  }
);

export const updateApplicationByPO = createAsyncThunk(
  "updateApplicationByPO",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.APPLICATION.APPLICATION, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Application...",
      }
    );
    dispatch(getApplicationForRenter());
    dispatch(getApplicationListForPO());
  }
);

export const deleteApplication = createAsyncThunk(
  "deleteApplication",
  async ({ applicationId, reason, decline }, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(
          `${apiEndPoints.APPLICATION.APPLICATION}?applicationId=${
            applicationId ? applicationId : ""
          }&note=${reason ? reason : ""}&decline=${decline ? decline : ""}`
        )
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Application...",
      }
    );
    dispatch(getApplicationForRenter());
    dispatch(getApprovedApplications());
    dispatch(getUser());
  }
);
