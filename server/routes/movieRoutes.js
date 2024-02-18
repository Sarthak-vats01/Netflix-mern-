import { Router } from "express";
import {
  getUpcomingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getTvShows,
} from "../controllers/moviesController.js";
const router = Router();

router.get("/getupcomingMovies", getUpcomingMovies);
router.get("/getpopularMovies", getPopularMovies);
router.get("/getTopRatedMovies", getTopRatedMovies);
router.get("/gettrendingMovies", getTrendingMovies);
router.get("/gettvshows", getTvShows);

export default router;
