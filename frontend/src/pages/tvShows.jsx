import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import backgroundImage from "../assets/home.jpg";
import MovieLogo from "../assets/homeTitle.webp";
import { FaPlay } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import CardSlider from "../components/CardSlider";
import { useSelector, useDispatch } from "react-redux";
import { updateTvShows } from "../redux/movies";
import axios from "axios";
import { SERVER_URL } from "../utils/constant.js";

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
    top: 23%;
    left: 5%;
    height: 42%;
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

function TvShows() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useDispatch();

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

  useEffect(() => {
    getTvShows();
  }, []);

  window.onscroll = () => {
    setIsScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const movies = useSelector((state) => state.movies);
  console.log("hi ", movies.tvShows.results);

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
          heading="TV Shows"
          movieData={movies?.tvShows.Data}
        ></CardSlider>
      </div>
    </Container>
  );
}

export default TvShows;
