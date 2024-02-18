import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { FiSearch } from "react-icons/fi";
import { FaPowerOff } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../utils/constant";
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

const Container = styled.div`
  width: 100%;
  position: fixed;
  z-index: 1000;

  .isScrolled {
    background-color: #141414;
  }

  .notScrolled {
    background-color: transparent;
  }

  nav {
    display: flex;
    justify-content: space-between;
    padding: 0% 3%;
    align-items: center;

    .left {
      display: flex;
      width: 45%;

      img {
        height: 3.5rem;
      }

      ul {
        display: flex;
        justify-content: space-between;
        width: 45%;
        list-style-type: none;
      }
    }

    .right {
      display: flex;
      justify-content: space-between;
      width: auto;

      button {
        background-color: transparent;
        border: none;
        cursor: pointer;

        &:focus {
          outline: none;
        }

        svg {
          color: #f34242;
          font-size: 1.2rem;
        }
      }

      .search {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.2rem;
        padding-left: 0.5rem;

        button {
          background-color: transparent;

          svg {
            color: white;
          }
        }

        input {
          width: 0;
          opacity: 0;
          visibility: hidden;
          transition: 0.3s ease-in-out;
          background-color: transparent;
          border: none;
          color: white;

          &:focus {
            outline: none;
          }
        }
      }

      .show-search {
        border: 1px solid white;
        background-color: rgba(0, 0, 0, 0.6);
        transform: translate(-20px);

        input {
          width: 100px !important;
          opacity: 1;
          visibility: visible;
          padding: 0.3rem;
        }
      }
    }
  }
`;

function Navbar({ isScrolled }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const userId = id;
  const links = [
    { name: "Home", link: `/home/${userId}` },
    { name: "TV Shows", link: `/tv/${userId}` },
    { name: "Movies", link: `/movies/${userId}` },
  ];

  const [showSearch, setShowSearch] = useState(false);
  const [inputHover, setInputHover] = useState(false);

  function handleLogout() {
    // Implement your logout logic here
    // For example, redirect to the login page after logout
    // useNavigate("/login");
    axios
      .get(`${SERVER_URL}/user/signout`)
      .then(() => {
        console.log("LoggedOut");
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/login");
  }

  return (
    <Container>
      <nav className={isScrolled ? "isScrolled" : "notScrolled"}>
        <div className="left">
          <div>
            <img src={Logo} alt="logo" />
          </div>
          <ul>
            {links.map(({ name, link }) => (
              <li key={name}>
                <StyledLink to={link}>{name}</StyledLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="right">
          <div className={`search ${showSearch ? "show-search" : ""}`}>
            <button
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                if (!inputHover) setShowSearch(false);
              }}
            >
              <FiSearch />
            </button>
            <input
              type="text"
              placeholder="Search"
              onMouseEnter={() => setInputHover(true)}
              onMouseLeave={() => setInputHover(false)}
              onBlur={() => {
                setShowSearch(false);
                setInputHover(false);
              }}
            />
          </div>
          <button onClick={handleLogout}>
            <FaPowerOff />
          </button>
        </div>
      </nav>
    </Container>
  );
}

export default Navbar;
