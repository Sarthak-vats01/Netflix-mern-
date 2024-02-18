import popularMoviesModel from "../models/popularMovies.js";
import {
  trendingMoviesModel,
  upcomingMoviesModel,
  tvShowsModel,
  topRatedMoviesModel,
} from "../models/movies.js";

async function getUpcomingMovies(req, res) {
  try {
    // Fetch upcoming movies from the database
    const upcomingMoviesData = await upcomingMoviesModel.findOne();

    if (!upcomingMoviesData) {
      return res.status(404).json({ message: "Upcoming movies not found" });
    }

    // Respond with the upcoming movies data
    return res.status(200).send(upcomingMoviesData);
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getPopularMovies(req, res) {
  try {
    // Fetch upcoming movies from the database
    const popularMoviesData = await popularMoviesModel.findOne();

    if (!popularMoviesData) {
      return res.status(404).json({ message: "popular movies not found" });
    }

    // Respond with the upcoming movies data
    return res.status(200).send(popularMoviesData);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getTopRatedMovies(req, res) {
  try {
    // Fetch upcoming movies from the database
    const topRatedMoviesData = await topRatedMoviesModel.findOne();

    if (!topRatedMoviesData) {
      return res.status(404).json({ message: "top rated movies not found" });
    }

    // Respond with the upcoming movies data
    return res.status(200).send(topRatedMoviesData);
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getTrendingMovies(req, res) {
  try {
    // Fetch upcoming movies from the database
    const TrendingMoviesData = await trendingMoviesModel.findOne();

    if (!TrendingMoviesData) {
      return res.status(404).json({ message: "trending movies not found" });
    }

    // Respond with the upcoming movies data
    return res.status(200).send(TrendingMoviesData);
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
async function getTvShows(req, res) {
  try {
    // Fetch upcoming movies from the database
    const tvshowsData = await tvShowsModel.findOne();

    if (!tvshowsData) {
      return res.status(404).json({ message: "tv shows  not found" });
    }

    // Respond with the upcoming movies data
    return res.status(200).send(tvshowsData);
  } catch (error) {
    console.error("Error fetching tv  shows:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export {
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getTvShows,
};
