import { apiEndPoints } from "@/utils";
import apiClient from "@/utils/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const getPost = createAsyncThunk("getPost", async ({ query }) => {
  return await apiClient
    .get(`${apiEndPoints.POST.POST}?query=${query}`)
    .then((res) => res.data);
});

export const getAllPost = createAsyncThunk("getAllPost", async ({ query }) => {
  return await apiClient
    .get(`${apiEndPoints.POST.POST_ALL}?query=${query}`)
    .then((res) => res.data);
});

export const addPost = createAsyncThunk(
  "addPost",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.POST.POST, data)
        .then((res) => {
          toast.success("Add Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Post...",
      }
    );
    dispatch(getAllPost({ query: "" }));
    dispatch(getPost({ query: "" }));
  }
);
export const reportPost = createAsyncThunk(
  "reportPost",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.POST.POST_REPORT, data)
        .then((res) => {
          toast.success("Post Reported!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Pending...",
      }
    );
    dispatch(getAllPost({ query: "" }));
  }
);

export const addPostReply = createAsyncThunk(
  "addPostReply",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .post(apiEndPoints.POST.POST_REPLY, data)
        .then((res) => {
          toast.success("Reply Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Adding Reply...",
      }
    );
    dispatch(getAllPost({ query: "" }));
  }
);

export const savePost = createAsyncThunk(
  "savePost",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .put(apiEndPoints.POST.POST_SAVE, data)
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
    dispatch(getAllPost({ query: "" }));
  }
);

export const deletePost = createAsyncThunk(
  "deletePost",
  async (data, { dispatch }) => {
    await toast.promise(
      apiClient
        .delete(`${apiEndPoints.POST.POST}?postId=${data}`)
        .then((res) => {
          toast.success("Delete Successful!");
          return res.data;
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        }),
      {
        pending: "Deleting Post...",
      }
    );
    dispatch(getPost({ query: "" }));
    dispatch(getAllPost({ query: "" }));
  }
);
