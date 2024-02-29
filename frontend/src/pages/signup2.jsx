import React, { useState } from "react";
import axios from "axios";
import NetflixLogo from "../assets/logo.png";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { UserURL } from "../utils/constant.js";

const Container = styled.div`
  position: relative;

  .Header {
    position: absolute;
    top: 1%;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #ebe9e9;

    img {
      padding-left: 18px;
      height: 5.8rem;
      width: auto;
      cursor: pointer;
    }

    button {
      padding-right: 60px;
      font-size: 1.1rem;
      font-weight: bold;
      min-height: 2rem;
      background: inherit;
      color: black;
      border: none;
      cursor: pointer;
    }
  }

  .Content {
    position: absolute;
    top: 120px;
    left: 35%;
    display: flex;
    flex-direction: column;

    .step {
      color: white;
      margin: 5px 0;
      span {
        font-weight: 600;
      }
    }

    h1 {
      color: white;
      margin: 0;
    }

    .para {
      color: white;
      margin: 0.6rem 0;
      font-weight: 400;
      font-size: 1.2rem;
    }

    input {
      line-height: 1.2;
      font-size: 1rem;
      margin: 10px 0px;
      width: 100%;
      color: inherit;
      filter: opacity(100%);
      padding: 1.25rem 1rem 0.25rem;
    }

    button {
      margin: 10px 0px;
      padding: 1.5rem 0.5rem;
      border-radius: 4px;
      font-size: 24px;
      font-weight: 400;
      border: none;
      background: rgb(229, 9, 20);
      color: white;
      width: 109%;
      cursor: pointer;
    }
  }
`;

function Signup2() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [password, setPassword] = useState("");

  function signup(e) {
    e.preventDefault();

    axios
      .post(`${UserURL}/signup`, {
        email: email,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        setPassword("");
        localStorage.setItem("token", response.data.token);

        navigate(`/home/${res.data.userId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="signup2Page">
      <Container>
        <div className="Header">
          <img src={NetflixLogo} alt="NetflixLogo" />
          <button onClick={() => navigate("/login")}>Sign In</button>
        </div>
        <div className="Content">
          <p className="step">
            STEP <span>1</span> OF <span>3</span>
          </p>
          <h1>
            Create a password to start <br /> your membership
          </h1>
          <p className="para">
            Just a few more steps and you're done! <br /> We hate paperwork,
            too.
          </p>
          <input type="email" placeholder="Email" value={email} readOnly />
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
          <button onClick={signup}>Next</button>
        </div>
      </Container>
    </div>
  );
}

export default Signup2;
