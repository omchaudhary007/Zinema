import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    fetchAllMovies: (state, action) => {
      state.movies = action.payload;
    },
    toAddMovie: (state, action) => {
      state.movies.push(action.payload);
    },
    toEditMovie: (state, action) => {
      const { movieId, updatedData } = action.payload;

      const movieIndex = state.movies.findIndex(
        (movie) => movie._id === movieId
      );

      if (movieIndex !== -1) {
        state.movies[movieIndex] = updatedData;
      }
    },
    toDeleteMovie: (state, action) => {
      state.movies = state.movies.filter(
        (movie) => movie._id !== action.payload
      );
    },
  },
});

export const { fetchAllMovies, toAddMovie, toEditMovie, toDeleteMovie } =
  movieSlice.actions;

export default movieSlice.reducer;
