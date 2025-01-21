import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllPet = createAsyncThunk("getAllPet", async () => {
  return await apiClient.get(apiEndPoints.PET.PET).then((res) => res.data);
});

export const getAllPetForPo = createAsyncThunk(
  "getAllPetForPo",
  async ({ propertyId, query }) => {
    return await apiClient
      .get(
        `${apiEndPoints.PET.ALL_PET}?propertyId=${propertyId}&query=${query}`
      )
      .then((res) => res.data);
  }
);

export const getPetInfo = createAsyncThunk("getPetInfo", async () => {
  return await apiClient.get(apiEndPoints.PET.PET_INFO).then((res) => res.data);
});

export const addPet = createAsyncThunk("addPet", async (data, { dispatch }) => {
  await toast.promise(
    apiClient
      .post(apiEndPoints.PET.PET, data)
      .then((res) => {
        toast.success("Add Successful!");
        return res.data;
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      }),
    {
      pending: "Adding Pet...",
    }
  );
  dispatch(getAllPet());
});

export const updatePet = createAsyncThunk(
  "updatePet",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.PET.PET, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Pet...",
      }
    );
    dispatch(getAllPet());
  }
);

export const deletePet = createAsyncThunk(
  "deletePet",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.PET.PET}?petId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Pet...",
      }
    );
    dispatch(getAllPet());
  }
);
