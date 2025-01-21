import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  bed: "",
  bath: "",
  price: "",
  offer: "",
  date: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setBed: (state, action) => {
      state.bed = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setBath: (state, action) => {
      state.bath = action.payload;
    },
    setPrice: (state, action) => {
      state.price = action.payload;
    },
    setOffer: (state, action) => {
      state.offer = action.payload;
    },
    setDate: (state, action) => {
      state.date = action.payload;
    },
  },
});

export const { setBed, setBath, setPrice, setOffer, setDate, setQuery } =
  searchSlice.actions;
export default searchSlice.reducer;
