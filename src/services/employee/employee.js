import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getAllEmployee = createAsyncThunk("getAllEmployee", async () => {
  return await apiClient
    .get(apiEndPoints.EMPLOYEE.EMPLOYEE)
    .then((res) => res.data);
});

export const addEmployee = createAsyncThunk(
  "addEmployee",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.EMPLOYEE.EMPLOYEE, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          if (err.response.data.status_code === 400) {
            toast.info("Password must be at least 6 characters long");
          }
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Employee...",
      }
    );
    dispatch(getAllEmployee());
  }
);

export const updateEmployee = createAsyncThunk(
  "updateEmployee",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.EMPLOYEE.EMPLOYEE, data)
        .then((res) => {
          toast.success(res.data.message);
          return res.data;
        })
        .catch((err) => {
          toast.info(err.response.data.message);
        }),
      {
        pending: "Updating Employee...",
      }
    );
    dispatch(getAllEmployee());
  }
);

export const updateEmployeeCredential = createAsyncThunk(
  "updateEmployeeCredential",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.EMPLOYEE.CREDENTIAL, data)
        .then((res) => {
          toast.success(res.data.message);
          return res.data;
        })
        .catch((err) => {
          if (err.response.data.status_code === 400) {
            toast.info("Password must be at least 6 characters long");
          }
          toast.info(err.response.data.message);
        }),
      {
        pending: "Updating Credential...",
      }
    );
    dispatch(getAllEmployee());
  }
);

export const deleteEmployee = createAsyncThunk(
  "deleteEmployee",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.EMPLOYEE.EMPLOYEE}?employeeId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Employee...",
      }
    );
    dispatch(getAllEmployee());
  }
);
