import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theaters: [],
};

const theaterSlice = createSlice({
  name: "theater",
  initialState,
  reducers: {
    toFetchTheaters: (state, action) => {
      state.theaters = action.payload;
    },
    toAddTheater: (state, action) => {
      state.theaters.push(action.payload);
    },
    toEditTheater: (state, action) => {
      const { theaterId, updatedData } = action.payload;

      const theaterIndex = state.theaters.findIndex(
        (theater) => theater._id === theaterId
      );

      if (theaterIndex !== -1) {
        state.theaters[theaterIndex] = updatedData;
      }
    },
    toDeleteTheater: (state, action) => {
      state.theaters = state.theaters.filter(
        (theater) => theater._id !== action.payload
      );
    },
  },
});

export const { toFetchTheaters, toAddTheater, toEditTheater, toDeleteTheater } =
  theaterSlice.actions;

export default theaterSlice.reducer;
