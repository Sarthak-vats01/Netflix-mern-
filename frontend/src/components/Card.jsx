// Card.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { CiPlay1 } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { SlLike } from "react-icons/sl";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
const CardContainer = styled.div`
  width: 230px;
  height: 130px;
  margin: 10px 10px;
  cursor: pointer;

  .Card {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 32px;
    align-items: center;

    .expandedContent {
      display: flex;
      flex-direction: column;
      align-items: center; // Center align content horizontally
      position: relative; // Ensure that z-index works
      z-index: 2; // Set a higher z-index
      // border: 2px solid white;
      top: -20px;

      img {
        flex: 1; // Use flex to make the image and expandedbuttons sections take up equal space
        width: 100%; // Make the image take up 100% width of its container
        height: auto; // Maintain the aspect ratio
        border-radius: 5px;
      }

      .expandedbuttons {
        display: flex;
        justify-content: space-around; // Space buttons equally
        align-items: center; // Center align buttons vertically
        width: 100%; // Make the buttons take up 100% width of their container
        color: white;
        font:size: 5.5rem;
      }
    }

    .normalContent {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;
      margin-top: 32px;
      align-items: center;
      margin-bottom: 80px;
      position: relative; /* Set position relative for the parent container */

      img {
        width: 230px;
        height: 130px;
        border-radius: 5px;
      }

      h3 {
        position: absolute;
        bottom: 0;
        margin: 0;
        color: white;
        font-size: 0.8rem;
        font-weight: normal;
      }
    }
  }
`;

const Card = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  const { id } = useParams();
  const userId = id;
  const navigate = useNavigate();
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";

  let hoverTimeout;

  function handleMouseEnter() {
    hoverTimeout = setTimeout(() => {
      setIsHovered(true);
    });
  }

  function handleMouseLeave() {
    clearTimeout(hoverTimeout);
    setIsHovered(false);
  }

  function handleMyList(movieData) {
    // Use movieData in the function
    axios
      .post(`${BASE_URL}/createList/${userId}`, {
        myListData: {
          movieData,
        },
      })
      .then((res) => {
        console.log("myList item appended -> ", res.data);
      })
      .catch((error) => {
        console.error("Error during registration:", error);
      });
  }

  return (
    <CardContainer>
      <div
        className="Card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovered ? (
          <div className="expandedContent">
            <img src={baseImageUrl + props.movieData.backdrop_path} alt="" />

            <div className="expandedbuttons">
              <CiPlay1 onClick={() => navigate("/player")}></CiPlay1>
              <IoMdAdd onClick={() => handleMyList(props.movieData)} />
              <SlLike />
            </div>
          </div>
        ) : (
          <div className="normalContent">
            <img
              onClick={() => navigate("/player")}
              src={baseImageUrl + props.movieData.backdrop_path}
              alt={"movieImage"}
            />
          </div>
        )}
      </div>
    </CardContainer>
  );
};

export default Card;
