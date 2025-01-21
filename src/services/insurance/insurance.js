import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getInsurance = createAsyncThunk("getAllInsurance", async () => {
  return await apiClient
    .get(apiEndPoints.INSURANCE.INSURANCE)
    .then((res) => res.data);
});

export const addInsurance = createAsyncThunk(
  "addInsurance",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.INSURANCE.INSURANCE, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Insurance...",
      }
    );
    dispatch(getAllInsurance());
  }
);

export const updateInsurance = createAsyncThunk(
  "updateInsurance",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.INSURANCE.INSURANCE, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Insurance...",
      }
    );
    dispatch(getAllInsurance());
  }
);
