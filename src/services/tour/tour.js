import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUser } from "../user/user";

export const getTourForRenter = createAsyncThunk(
  "getTourForRenter",
  async () => {
    return await apiClient.get(apiEndPoints.TOUR.TOUR).then((res) => res.data);
  }
);

export const getTourListForPO = createAsyncThunk(
  "getTourListForPO",
  async () => {
    return await apiClient
      .get(apiEndPoints.TOUR.PROPERTY)
      .then((res) => res.data);
  }
);

export const addTour = createAsyncThunk(
  "addTour",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.TOUR.TOUR, data)
        .then((res) => {
          toast.success("Apply Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Applying For Tour...",
      }
    );
    dispatch(getTourForRenter());
  }
);

export const updateTourByPO = createAsyncThunk(
  "updateTourByPO",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.TOUR.TOUR, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Tour...",
      }
    );
    dispatch(getTourListForPO());
  }
);

export const deleteTour = createAsyncThunk(
  "deleteTour",
  async ({ tourId, reason }, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(
          `${apiEndPoints.TOUR.TOUR}?tourId=${
            tourId ? tourId : ""
          }&deleteReason=${reason ? reason : ""}`
        )
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Tour...",
      }
    );
    dispatch(getTourForRenter());
    dispatch(getUser());
  }
);
