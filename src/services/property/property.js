import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getPropertyPublicView = createAsyncThunk(
  "getPropertyPublicView",
  async ({ query, bed, bath, date }) => {
    return await apiClient
      .get(
        `${apiEndPoints.PROPERTY.PUBLIC}?query=${query ? query : ""}&bed=${
          bed ? bed : ""
        }&bath=${bath ? bath : ""}&date=${date ? date : ""}`
      )
      .then((res) => res.data);
  }
);

export const getPropertyByIdPublicView = createAsyncThunk(
  "getPropertyPublicViewById",
  async (propertyId) => {
    return await apiClient
      .get(`${apiEndPoints.PROPERTY.PUBLIC}/${propertyId}`)
      .then((res) => res.data);
  }
);

export const getAllProperty = createAsyncThunk(
  "getAllProperty",
  async ({ country, city, name, sort }) => {
    return await apiClient
      .get(
        `${apiEndPoints.PROPERTY.PROPERTY}?country=${
          country ? country : ""
        }&city=${city ? city : ""}&name=${name ? name : ""}&sort=${
          sort ? sort : ""
        }`
      )
      .then((res) => res.data);
  }
);

export const getPropertyById = createAsyncThunk(
  "getPropertyById",
  async (id) => {
    return await apiClient
      .get(`${apiEndPoints.PROPERTY.PROPERTY}/${id}`)
      .then((res) => res.data);
  }
);

export const addProperty = createAsyncThunk(
  "addProperty",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.PROPERTY.PROPERTY, data)
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
      getAllProperty({
        sort: "desc",
      })
    );
  }
);

export const updateProperty = createAsyncThunk(
  "updateProperty",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.PROPERTY.PROPERTY, data)
        .then((res) => {
          if (res.data.status_code === 200) {
            toast.success(res.data.message);
          }
          dispatch(
            getAllProperty({
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

export const publishProperty = createAsyncThunk(
  "publishProperty",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.PROPERTY.PUBLISH, data)
        .then((res) => {
          toast.success("Publish Successful!");
          dispatch(
            getAllProperty({
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

export const deleteProperty = createAsyncThunk(
  "deleteProperty",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.PROPERTY.DELETE}?propertyId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Property...",
      }
    );
    dispatch(
      getAllProperty({
        sort: "desc",
      })
    );
  }
);

export const addPropertyReview = createAsyncThunk(
  "addPropertyReview",
  async (data) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.PROPERTY.REVIEW, data)
        .then((res) => {
          toast.success("Review Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Submitting Review...",
      }
    );
  }
);

export const replyPropertyReview = createAsyncThunk(
  "replyPropertyReview",
  async (data) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.PROPERTY.REVIEW, data)
        .then((res) => {
          toast.success("Reply Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Submitting Reply...",
      }
    );
  }
);

export const getPropertyListNameId = createAsyncThunk(
  "replyPropertyReview",
  async ({ subscription, withSingle, onlySingle }) => {
    return apiClient
      .get(
        `${apiEndPoints.PROPERTY.PROPERTY_NAME_ID}?subscription=${subscription}&withsingle=${withSingle}&onlysingle=${onlySingle}`
      )
      .then((res) => {
        return res.data;
      });
  }
);
