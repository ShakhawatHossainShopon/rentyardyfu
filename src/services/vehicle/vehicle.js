import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getPaidParkingForRenter } from "../paidParking/paidParking";

export const getAllVehicle = createAsyncThunk("getAllVehicle", async () => {
  return await apiClient
    .get(apiEndPoints.VEHICLE.VEHICLE)
    .then((res) => res.data);
});

export const getAllVehicleForPo = createAsyncThunk(
  "getAllVehicleForPo",
  async ({ propertyId, query }) => {
    return await apiClient
      .get(
        `${apiEndPoints.VEHICLE.ALL_VEHICLE}?propertyId=${propertyId}&query=${query}`
      )
      .then((res) => res.data);
  }
);

export const addVehicle = createAsyncThunk(
  "addVehicle",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.VEHICLE.VEHICLE, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Vehicle...",
      }
    );
    dispatch(getAllVehicle());
    dispatch(getPaidParkingForRenter());
  }
);

export const updateVehicle = createAsyncThunk(
  "updateVehicle",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.VEHICLE.VEHICLE, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Vehicle...",
      }
    );
    dispatch(getAllVehicle());
  }
);

export const updateParkingForVehicle = createAsyncThunk(
  "updateParkingForVehicle",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.VEHICLE.VEHICLE_PARKING, data)
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
    dispatch(getAllVehicle());
    dispatch(getPaidParkingForRenter());
  }
);

export const deleteVehicle = createAsyncThunk(
  "deleteVehicle",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.VEHICLE.VEHICLE}?vehicleId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Vehicle...",
      }
    );
    dispatch(getAllVehicle());
    dispatch(getPaidParkingForRenter());
  }
);
