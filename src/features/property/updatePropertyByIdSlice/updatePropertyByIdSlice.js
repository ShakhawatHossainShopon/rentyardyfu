import { updateProperty } from "@/services/property/property";
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  error: "",
};

const updatePropertyByIdSlice = createSlice({
  name: "updatePropertyById",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateProperty.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateProperty.fulfilled, (state, action) => {
      if (action.payload.status_code === 200) {
        state.loading = false;
        toast.success("Update Successful!");
      } else {
        toast.error("Update failed!");
      }
    });
    builder.addCase(updateProperty.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updatePropertyByIdSlice.reducer;
