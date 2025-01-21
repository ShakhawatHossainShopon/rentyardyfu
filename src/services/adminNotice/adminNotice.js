import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAdminNotice = createAsyncThunk("getAdminNotice", async () => {
  return await apiClient
    .get(apiEndPoints.ADMIN_NOTICE.ADMIN_NOTICE)
    .then((res) => res.data);
});

export const getAdminNoticeForRenter = createAsyncThunk(
  "getAdminNoticeForRenter",
  async () => {
    return await apiClient
      .get(apiEndPoints.ADMIN_NOTICE.ADMIN_NOTICE_AUTH)
      .then((res) => res.data);
  }
);
