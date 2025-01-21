import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getAllVehicle } from "../vehicle/vehicle";

export const getPaidParkingForPO = createAsyncThunk(
  "getPaidParkingForPO",
  async ({ propertyId }) => {
    return await apiClient
      .get(
        `${apiEndPoints.PAID_PARKING.PAID_PARKING}?propertyId=${
          propertyId ? propertyId : ""
        }`
      )
      .then((res) => res.data);
  }
);

export const getPaidParkingForRenter = createAsyncThunk(
  "getPaidParkingForRenter",
  async () => {
    return await apiClient
      .get(apiEndPoints.PAID_PARKING.RENTER_PAID_PARKING)
      .then((res) => res.data);
  }
);

export const addPaidParking = createAsyncThunk(
  "addPaidParking",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.PAID_PARKING.PAID_PARKING, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "pending...",
      }
    );
    dispatch(getPaidParkingForPO({ propertyId: "" }));
  }
);

export const deletePaidParking = createAsyncThunk(
  "deletePaidParking",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.PAID_PARKING.PAID_PARKING}?parkingId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "pending...",
      }
    );
    dispatch(getPaidParkingForPO({ propertyId: "" }));
  }
);

export const deletePaidParkingForRenter = createAsyncThunk(
  "deletePaidParkingForRenter",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(
          `${apiEndPoints.PAID_PARKING.RENTER_PAID_PARKING}?vehicleId=${data}`
        )
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "pending...",
      }
    );
    dispatch(getPaidParkingForRenter());
    dispatch(getAllVehicle());
  }
);
