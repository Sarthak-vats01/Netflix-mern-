// store.js

import { configureStore } from "@reduxjs/toolkit";
import Movies from "../redux/movies/index";

export const store = configureStore({
  reducer: {
    movies: Movies,
  },
});
