import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import backgroundImage from "../assets/download.jpg";
import MovieLogo from "../assets/Aquamanlogo-removebg.png";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CardSlider from "../components/CardSlider";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SERVER_URL } from "../utils/constant";
import { updateTrendingMovies, updatePopularMovies } from "../redux/movies";
const Container = styled.div`
  position: relative;

  .hero {
    img {
      height: 100vh;
      width: 100vw;
      filter: brightness(60%);
    }
  }

  .Content {
    display: flex;
    position: absolute;
    top: 20%;
    left: 5%;
    height: 27%;
    justify-content: space-between;
    flex-direction: column;

    img {
      height: 80%;
    }

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

function Movies() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
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

  useEffect(() => {
    getTrendingMovies();
    getPopularMovies();
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const movies = useSelector((state) => state.movies);

  // console.log("hi ", movies?.tvShows.results);

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundImage} alt="backgroundImage" />
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
        <CardSlider
          heading="Trending Movies"
          movieData={movies?.trendingMovies.Data}
        ></CardSlider>
        <CardSlider
          heading="Popular Movies"
          movieData={movies?.popularMovies.Data}
        ></CardSlider>
      </div>
    </Container>
  );
}

export default Movies;
