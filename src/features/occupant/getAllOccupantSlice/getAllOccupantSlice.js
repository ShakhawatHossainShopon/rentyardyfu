import { getAllOccupant } from "@/services/occupant/occupant";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getAllOccupantSlice = createSlice({
  name: "getAllOccupant",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getAllOccupant.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getAllOccupant.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
    });
    builder.addCase(getAllOccupant.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default getAllOccupantSlice.reducer;
