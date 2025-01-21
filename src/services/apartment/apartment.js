import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllApartment = createAsyncThunk(
  "getAllApartment",
  async ({ apartmentId, propertyId, unit_number, availability, sort }) => {
    return await apiClient
      .get(
        `${apiEndPoints.APARTMENT.APARTMENT}${`?apartmentId=${
          apartmentId ? apartmentId : ""
        }`}${`&propertyId=${propertyId ? propertyId : ""}`}${`&unit_number=${
          unit_number ? unit_number : ""
        }`}${`&available=${availability ? availability : ""}`}${`&sort=${
          sort ? sort : ""
        }`}`
      )
      .then((res) => res.data);
  }
);

export const getApartmentById = createAsyncThunk(
  "getApartmentById",
  async (id) => {
    return await apiClient
      .get(`${apiEndPoints.APARTMENT.APARTMENT}?apartmentId=${id}`)
      .then((res) => res.data);
  }
);

export const addApartment = createAsyncThunk(
  "addApartment",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.APARTMENT.APARTMENT, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Apartment...",
      }
    );
    dispatch(
      getAllApartment({
        sort: "desc",
      })
    );
  }
);

export const cloneApartment = createAsyncThunk(
  "cloneApartment",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.APARTMENT.APARTMENT_CLONE, data)
        .then((res) => {
          toast.success("Clone Successful!");
          dispatch(
            getAllApartment({
              sort: "desc",
            })
          );
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Cloning Apartment...",
      }
    );
  }
);

export const updateApartment = createAsyncThunk(
  "updateApartment",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.APARTMENT.APARTMENT, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Apartment...",
      }
    );
    dispatch(
      getAllApartment({
        sort: "desc",
      })
    );
  }
);

export const publishApartment = createAsyncThunk(
  "publishApartment",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.APARTMENT.PUBLISH, data)
        .then((res) => {
          toast.success("Publish Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Publishing Apartment...",
      }
    );
    dispatch(
      getAllApartment({
        sort: "desc",
      })
    );
  }
);

export const deleteApartment = createAsyncThunk(
  "deleteApartment",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.APARTMENT.APARTMENT}?apartmentId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Apartment...",
      }
    );
    dispatch(
      getAllApartment({
        sort: "desc",
      })
    );
  }
);
