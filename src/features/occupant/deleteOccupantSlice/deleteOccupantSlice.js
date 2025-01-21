import { deleteOccupant } from "@/services/occupant/occupant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const deleteOccupantSlice = createSlice({
  name: "deleteOccupant",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(deleteOccupant.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(deleteOccupant.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteOccupant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default deleteOccupantSlice.reducer;
