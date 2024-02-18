import React from "react";
import styled from "styled-components";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Trailer from "../assets/Trailer.mp4";

const Container = styled.div`
  .player {
    width: 100vw;
    height: 100vh;

    .back {
      position: absolute;
      left: 2%;
      top: 2%;
      font-size: 2rem;
      z-index: 1;
      color: white;
    }

    video {
      height: 100vh;
      width: 100%;
      object-fit: cover;
    }
  }
`;

function Player() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="player">
        <div className="back" onClick={() => navigate(-1)}>
          <IoArrowBackSharp />
        </div>
        <video src={Trailer} autoPlay loop controls></video>
      </div>
    </Container>
  );
}

export default Player;
