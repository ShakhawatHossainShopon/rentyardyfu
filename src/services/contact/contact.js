import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const addContact = createAsyncThunk("addContact", async (data) => {
  await toast.promise(
    apiClient
      .post(apiEndPoints.CONTACT.CONTACT, data)
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
});
