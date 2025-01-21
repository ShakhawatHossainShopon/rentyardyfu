import { updateOccupant } from "@/services/occupant/occupant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const updateOccupantSlice = createSlice({
  name: "updateOccupant",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(updateOccupant.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(updateOccupant.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(updateOccupant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default updateOccupantSlice.reducer;
