import mongoose from "mongoose";

const trendingMoviesSchema = new mongoose.Schema({
  Data: { type: Object },
});
const tvShowsSchema = new mongoose.Schema({
  Data: { type: Object },
});
const upcomingMoviesSchema = new mongoose.Schema({
  Data: { type: Object },
});
const topRatedMoviesSchema = new mongoose.Schema({
  Data: { type: Object },
});

const trendingMoviesModel = mongoose.model(
  "trendingMovie",
  trendingMoviesSchema
);
const tvShowsModel = mongoose.model("tvShows", tvShowsSchema);
const upcomingMoviesModel = mongoose.model(
  "upcomingMovie",
  upcomingMoviesSchema
);
const topRatedMoviesModel = mongoose.model(
  "topRatedMovie",
  topRatedMoviesSchema
);

export {
  trendingMoviesModel,
  tvShowsModel,
  upcomingMoviesModel,
  topRatedMoviesModel,
};
