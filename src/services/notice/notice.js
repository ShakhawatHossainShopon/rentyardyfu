import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getUser } from "../user/user";

export const getAllNoticeByPO = createAsyncThunk(
  "getAllNoticeByPO",
  async () => {
    return await apiClient
      .get(apiEndPoints.NOTICE.NOTICE_PROPERTY)
      .then((res) => res.data);
  }
);

export const getAllNoticeByRenter = createAsyncThunk(
  "getAllNoticeByRenter",
  async (propertyId) => {
    return await apiClient
      .get(`${apiEndPoints.NOTICE.NOTICE}?propertyId=${propertyId}`)
      .then((res) => res.data);
  }
);

export const addNotice = createAsyncThunk(
  "addNotice",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.NOTICE.NOTICE, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Announcement...",
      }
    );
    dispatch(getAllNoticeByPO());
  }
);

export const updateNotice = createAsyncThunk(
  "updateNotice",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.NOTICE.NOTICE, data)
        .then((res) => {
          toast.success("Update Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Updating Announcement...",
      }
    );
    dispatch(getAllNoticeByPO());
  }
);

export const updateNoticeVisibility = createAsyncThunk(
  "updateNoticeVisibility",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.NOTICE.NOTICE_VISIBILITY, data)
        .then((res) => {
          toast.success("Announcement Visibility Updated!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getAllNoticeByPO());
  }
);

export const hideNotice = createAsyncThunk(
  "hideNotice",
  async (_, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.NOTICE.NOTICE_HIDE)
        .then((res) => {
          toast.success("Announcement Closed!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getUser());
  }
);

export const deleteNotice = createAsyncThunk(
  "deleteNotice",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.NOTICE.NOTICE}?announcementId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Announcement...",
      }
    );
    dispatch(getAllNoticeByPO());
  }
);
