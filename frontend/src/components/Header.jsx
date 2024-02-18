import React from "react";
import NetflixLogo from "../assets/logo.png";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: absolute;
  top: 1%;
  left: 9%;
  width: 81%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 5rem;2
    cursor: pointer;
  }

  button {
    font-size: 0.975rem;
    font-weight: 500;
    min-height: 2rem;
    padding: 0.25rem 1rem;
    background: rgb(229, 9, 20);
    color: rgb(255, 255, 255);
    border-radius: 0.25rem;
    border: none;
    cursor: pointer;
  }
`;
function Header() {
  const navigate = useNavigate();

  return (
    <Container>
      <img src={NetflixLogo} alt="NetflixLogo" />
      <button onClick={() => navigate("/login")}>Sign In</button>
    </Container>
  );
}

export default Header;
