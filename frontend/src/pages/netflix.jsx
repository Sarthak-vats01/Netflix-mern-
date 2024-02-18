// Netflix.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import styled from "styled-components";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateTvShows,
  updatePopularMovies,
  updateUpcomingMovies,
  updateTrendingMovies,
  updateTopRatedMovies,
} from "../redux/movies/index.js";
import axios from "axios";
import CardSlider from "../components/CardSlider";
import {
  TMBD_BASE_URL,
  API_KEY,
  BASE_URL,
  SERVER_URL,
} from "../utils/constant.js";
import Video from "../assets/Trailer.mp4";
// import useAuthentication from "../Auth.js";

const Container = styled.div`
  position: relative;

  .hero {
    height: 100vh;
    width: 100vw;

    img {
      height: 100vh;
      width: 100vw;
      object-fit: cover;
      filter: brightness(60%);
    }

    video {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .Content {
    display: flex;
    position: absolute;
    top: 10%;
    left: 5%;
    height: 18%;
    justify-content: space-between;
    flex-direction: column;

    .buttons {
      display: flex;
      width: 58%;
      justify-content: space-between;

      button {
        margin-right: 5px;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        border: none;
        width: 40%;
        justify-content: center;

        padding-top: 12px;
        padding-bottom: 12px;
        border-radius: 7px;
        cursor: pointer;

        &:hover {
          opacity: 0.8;
        }

        svg {
          margin-right: 5px;
        }
      }

      .moreInfo {
        background-color: rgba(109, 109, 110, 0.7);
        color: white;
      }
    }
  }
`;

function Netflix() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [myList, setMyList] = useState([]);
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = id;
  // const { authenticated } = useAuthentication();

  // useEffect(() => {
  //   if (!authenticated) {
  //     // Redirect to login page if not authenticated
  //     navigate("/login");
  //   }
  // }, [authenticated, navigate]);

  console.log("User ID from URL:", userId);

  async function getTvShows() {
    //
    try {
      const response = await axios.get(`${SERVER_URL}/movies/gettvshows`);
      const result = response.data;

      console.log("getTvShows result", result);
      dispatch(updateTvShows(result));
    } catch (error) {
      console.error("Error fetching TV shows:", error);
    }
  }

  async function getTrendingMovies() {
    //
    try {
      const response = await axios.get(
        `${SERVER_URL}/movies/gettrendingMovies`
      );
      const result = response.data;

      dispatch(updateTrendingMovies(result));
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  }

  async function getUpcomingMovies() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/movies/getupcomingMovies`
      );
      const result = response.data;
      console.log("upcoming movies ", result);
      dispatch(updateUpcomingMovies(result));
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  }

  async function getPopularMovies() {
    //
    try {
      const response = await axios.get(`${SERVER_URL}/movies/getpopularMovies`);
      const result = response.data;

      dispatch(updatePopularMovies(result));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  }

  async function getTopRatedMovies() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/movies/getTopRatedMovies`
      );
      const result = response.data;

      dispatch(updateTopRatedMovies(result));
    } catch (error) {
      console.error("Error fetching top-rated movies:", error);
    }
  }

  function fetchMyList() {
    axios
      .get(`${BASE_URL}/getList/${userId}`)
      .then((res) => {
        setMyList(res.data[0].Data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getTvShows();
    getUpcomingMovies();
    getTrendingMovies();
    getPopularMovies();
    getTopRatedMovies();
    fetchMyList();
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const movies = useSelector((state) => state.movies);

  const handleMouseHover = () => {
    const timeoutId = setTimeout(() => {
      setShowVideo(true);
    }, 3000);

    return () => clearTimeout(timeoutId);
  };

  const handleMouseLeave = () => {
    setShowVideo(false);
  };

  function handleHeroClick() {
    navigate("/player");
  }

  console.log("Movies", movies);
  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div
        className="hero"
        onMouseEnter={handleMouseHover}
        onMouseLeave={handleMouseLeave}
        onClick={handleHeroClick}
      >
        {showVideo ? (
          <video src={Video} autoPlay loop></video>
        ) : (
          <img src={backgroundImage} alt="backgroundImage" />
        )}
      </div>
      <div className="Content">
        <div className="logo">
          <img src={MovieLogo} alt="MovieLogo" />
        </div>
        <div className="buttons">
          <button onClick={() => navigate("/player")}>
            <FaPlay></FaPlay>Play
          </button>
          <button className="moreInfo">
            <IoIosInformationCircleOutline />
            More Info
          </button>
        </div>
      </div>
      <div className="contentNavigation">
        <CardSlider heading="Popular " movieData={movies?.popularMovies.Data} />
        <CardSlider
          heading="Top-Rated"
          movieData={movies?.topRatedMovies.Data}
        />
        <CardSlider
          heading="Trending "
          movieData={movies?.trendingMovies.Data}
        />
        <CardSlider heading="TV Shows" movieData={movies?.tvShows.Data} />
        <CardSlider
          heading="Upcoming Movies"
          movieData={movies?.upcomingMovies.Data}
        />
        {myList && myList.length > 0 && (
          <CardSlider heading="My List" movieData={myList} />
        )}{" "}
      </div>
    </Container>
  );
}
export default Netflix;
