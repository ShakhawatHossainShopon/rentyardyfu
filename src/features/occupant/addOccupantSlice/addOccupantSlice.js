import { addOccupant } from "@/services/occupant/occupant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: "",
};

const addOccupantSlice = createSlice({
  name: "addOccupant",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addOccupant.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addOccupant.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(addOccupant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default addOccupantSlice.reducer;
