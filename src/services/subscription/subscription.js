import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getSubsPricing = createAsyncThunk(
  "getSubsPricing",
  async (data) => {
    return await toast.promise(
      apiClient
        .get(
          `${apiEndPoints.SUBSCRIPTION.SUBSCRIPTION_CHECK_PRICING}?propertyId=${
            data ? data : ""
          }`
        )
        .then((res) => {
          toast.success("Check Your Price Below.");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
  }
);

export const getActiveSubs = createAsyncThunk("getActiveSubs", async () => {
  return await apiClient
    .get(apiEndPoints.SUBSCRIPTION.SUBSCRIPTION)
    .then((res) => res.data);
});

export const addSubs = createAsyncThunk(
  "addSubs",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.SUBSCRIPTION.SUBSCRIPTION, data)
        .then((res) => {
          toast.success("Apply Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getActiveSubs());
  }
);

export const updateAutoRenewal = createAsyncThunk(
  "updateAutoRenewal",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.SUBSCRIPTION.SUBSCRIPTION_AUTO_RENEWAL, data)
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
    dispatch(getActiveSubs());
  }
);

export const deleteSubs = createAsyncThunk(
  "deleteSubs",
  async (data, { dispatch }) => {
    return await toast.promise(
      apiClient
        .delete(
          `${apiEndPoints.SUBSCRIPTION.SUBSCRIPTION}?propertyId=${
            data ? data : ""
          }`
        )
        .then((res) => {
          toast.success("Subscription Cancelled!");
          dispatch(getActiveSubs());
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
  }
);
