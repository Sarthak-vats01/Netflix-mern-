import { createSlice } from "@reduxjs/toolkit";

const Movies = createSlice({
  name: "movies",
  initialState: {
    topRatedMovies: [],
    trendingMovies: [],
    popularMovies: [],
    upcomingMovies: [],
    tvShows: [],
  },
  reducers: {
    updateTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    updateTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
    },
    updatePopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    updateUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
    },
    updateTvShows: (state, action) => {
      state.tvShows = action.payload;
    },
  },
});

export const {
  updateTopRatedMovies,
  updateTvShows,
  updatePopularMovies,
  updateTrendingMovies,
  updateUpcomingMovies,
} = Movies.actions;

export default Movies.reducer;
