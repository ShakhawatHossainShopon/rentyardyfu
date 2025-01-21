import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getStatements = createAsyncThunk(
  "getStatements",
  async ({ unit_number, propertyId }) => {
    return apiClient
      .get(
        `${apiEndPoints.STATEMENTS.STATEMENTS}?propertyId=${
          propertyId ? propertyId : ""
        }&unit_number=${unit_number ? unit_number : ""}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }
);

export const updateStatement = createAsyncThunk(
  "updateStatement",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.STATEMENTS.STATEMENTS, data)
        .then((res) => {
          toast.success("Payment Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getStatements({ unit_number: "", propertyId: "" }));
  }
);
