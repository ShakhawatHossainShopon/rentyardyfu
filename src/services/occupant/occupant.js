import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllOccupant = createAsyncThunk("getAllOccupant", async () => {
  return await apiClient
    .get(apiEndPoints.OCCUPANT.OCCUPANT)
    .then((res) => res.data);
});

export const addOccupant = createAsyncThunk(
  "addOccupant",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.OCCUPANT.OCCUPANT, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Occupant...",
      }
    );
    dispatch(getAllOccupant());
  }
);

export const updateOccupant = createAsyncThunk(
  "updateOccupant",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.OCCUPANT.OCCUPANT, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Occupant...",
      }
    );
    dispatch(getAllOccupant());
  }
);

export const deleteOccupant = createAsyncThunk(
  "deleteOccupant",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.OCCUPANT.OCCUPANT}?occupantId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Occupant...",
      }
    );
    dispatch(getAllOccupant());
  }
);
