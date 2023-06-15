import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showtimes: [],
  currentPage: 1,
  totalPages: 1,
  totalShowtimes: 0,
  loading: false,
  error: null
};

const showtimeSlice = createSlice({
  name: "showtime",
  initialState,
  reducers: {
    toFetchShowtimes: (state, action) => {
      state.showtimes = action.payload.showtimes;
      state.currentPage = action.payload.currentPage;
      state.totalPages = action.payload.totalPages;
      state.totalShowtimes = action.payload.totalShowtimes;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    toAddShowtime: (state, action) => {
      state.showtimes.push(action.payload);
      state.totalShowtimes += 1;
    },
    toEditShowtime: (state, action) => {
      const { showtimeId, updatedData } = action.payload;
      const showtimeIndex = state.showtimes.findIndex(
        (showtime) => showtime._id === showtimeId
      );
      if (showtimeIndex !== -1) {
        state.showtimes[showtimeIndex] = updatedData;
      }
    },
    toDeleteShowtime: (state, action) => {
      state.showtimes = state.showtimes.filter(
        (showtime) => showtime._id !== action.payload
      );
      state.totalShowtimes -= 1;
    },
  },
});

export const {
  toFetchShowtimes,
  toAddShowtime,
  toEditShowtime,
  toDeleteShowtime,
  setLoading,
  setError
} = showtimeSlice.actions;

export default showtimeSlice.reducer;
