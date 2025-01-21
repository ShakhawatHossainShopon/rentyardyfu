import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllPaymentMethods = createAsyncThunk(
  "getAllPaymentMethods",
  async () => {
    return await apiClient
      .get(apiEndPoints.PAYMENT.PAYMENT)
      .then((res) => res.data);
  }
);

export const getAllTransaction = createAsyncThunk(
  "getAllTransaction",
  async ({ date_to, date_from, unit_number, propertyId }) => {
    return await apiClient
      .get(
        `${apiEndPoints.PAYMENT.TRANSACTION}?date_to=${
          date_to ? date_to : ""
        }&date_from=${date_from ? date_from : ""}&unit_number=${
          unit_number ? unit_number : ""
        }&propertyId=${propertyId ? propertyId : ""}`
      )
      .then((res) => res.data);
  }
);

export const getAllTransactionForRenter = createAsyncThunk(
  "getAllTransaction",
  async ({ date_to, date_from }) => {
    return await apiClient
      .get(
        `${apiEndPoints.PAYMENT.TRANSACTION_RENTER}?date_to=${
          date_to ? date_to : ""
        }&date_from=${date_from ? date_from : ""}`
      )
      .then((res) => res.data);
  }
);

export const addPaymentMethod = createAsyncThunk(
  "addPaymentMethod",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.PAYMENT.PAYMENT, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Payment Method...",
      }
    );
    dispatch(getAllPaymentMethods());
  }
);

export const getAllWithdrawnRequestList = createAsyncThunk(
  "getAllWithdrawnRequestList",
  async (data) => {
    return await apiClient
      .get(
        `${apiEndPoints.PAYMENT.PAYMENT_WITHDRAW_LIST}?status=${
          data ? data : ""
        }`
      )
      .then((res) => res.data);
  }
);

export const withdrawAmount = createAsyncThunk(
  "withdrawAmount",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.PAYMENT.PAYMENT_WITHDRAW, data)
        .then((res) => {
          toast.success("Withdraw Successful!");
          sessionStorage.setItem("otp_verifier", res.data.otp_verifier);
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

export const addPaymentMethodForPO = createAsyncThunk(
  "addPaymentMethodForPO",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.PAYMENT.PAYMENT_PO, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getAllPaymentMethods());
  }
);

export const updatePaymentMethod = createAsyncThunk(
  "updatePaymentMethod",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.PAYMENT.PAYMENT, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Payment Method...",
      }
    );
    dispatch(getAllPaymentMethods());
  }
);

export const makePrimaryPaymentMethod = createAsyncThunk(
  "makePrimaryPaymentMethod",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.PAYMENT.PAYMENT_DEFAULT, data)
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
    dispatch(getAllPaymentMethods());
  }
);

export const deletePaymentMethod = createAsyncThunk(
  "deletePaymentMethod",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.PAYMENT.PAYMENT}?paymentMethodId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Payment Method...",
      }
    );
    dispatch(getAllPaymentMethods());
  }
);
