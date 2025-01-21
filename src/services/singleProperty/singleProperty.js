import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllSingleProperty = createAsyncThunk(
  "getSingleProperty",
  async ({ country, city, name, sort }) => {
    return await apiClient
      .get(
        `${apiEndPoints.SINGLE_PROPERTY.SINGLE_PROPERTY}?country=${
          country ? country : ""
        }&city=${city ? city : ""}&name=${name ? name : ""}&sort=${
          sort ? sort : ""
        }`
      )
      .then((res) => res.data);
  }
);

export const addSingleProperty = createAsyncThunk(
  "addSingleProperty",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.SINGLE_PROPERTY.SINGLE_PROPERTY, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Property...",
      }
    );
    dispatch(
      getAllSingleProperty({
        sort: "desc",
      })
    );
  }
);

export const updateSingleProperty = createAsyncThunk(
  "updateSingleProperty",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.SINGLE_PROPERTY.SINGLE_PROPERTY, data)
        .then((res) => {
          if (res.data.status_code === 200) {
            toast.success(res.data.message);
          }
          dispatch(
            getAllSingleProperty({
              sort: "desc",
            })
          );
          return res.data;
        })
        .catch((err) => {
          if (err.response.data.status_code === 400) {
            toast.info(err.response.data.message);
          } else {
            toast.error(err.response.data.message);
          }
        }),
      {
        pending: "Updating Property...",
      }
    );
  }
);

export const publishSingleProperty = createAsyncThunk(
  "publishSingleProperty",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.SINGLE_PROPERTY.PUBLISH, data)
        .then((res) => {
          toast.success("Publish Successful!");
          dispatch(
            getAllSingleProperty({
              sort: "desc",
            })
          );
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Publishing Property...",
      }
    );
  }
);
