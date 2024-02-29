import React, { useState } from "react";
import styled from "styled-components";
import BackgroundImage from "../assets/login.jpg";
import Header from "../components/Header";
import { IoIosArrowForward } from "react-icons/io";

import { useNavigate } from "react-router-dom";

const Container = styled.div`
  position: relative;
  height: 94vh;
  overflow: hidden;
  justify-content: center; /* Center the content vertically */
  align-items: center; /* Center the content horizontally */
  border-bottom: 8px solid #232323;

  .BackgroundImage {
    width: 100%;
    height: 100%;
    display: block;
    filter: brightness(
      0.45
    ); /* Adjust the brightness (0.5 means 50% darkness) */
  }

  .Content {
    position: absolute;
    top: 34%;
    left: 22%;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;

    h1 {
      margin: 0;
    }

    p {
      margin-top: 2;
    }
  }

  .Form {
    display: flex;
    width: 80%;
    justify-content: space-between;

    input {
      padding: 1.5rem 1rem 0.5rem;
      line-height: 1.5;
      font-size: 1rem;
      width: 55%;
      background-color: inherit;
      border: 0.5px solid white;
      border-radius: 7px;
      text-align: left;
      color: white;

      ::placeholder {
        line-height: 1.5;
        padding-left: 5px;
      }
    }

    button {
      cursor: pointer;
      display: flex;
      align-items: center;
      width: auto;
      font-size: 1.5rem;
      font-weight: 500;
      line-height: 1.5rem;
      padding: 0.75rem 2.5rem;
      background: rgb(229, 9, 20);
      color: rgb(255, 255, 255);
      border-radius: 7px;
      border: none;

      span {
        margin-left: 4px;
        padding-top: 4px;
      }
    }
  }
`;

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  return (
    <div
      className="signupPage"
      style={{ height: "100vh", backgroundColor: "black" }}
    >
      <Container>
        <img src={BackgroundImage} className="BackgroundImage" alt="signup" />
        <Header />

        <div className="Content">
          <h1>Unlimited movies, TV shows and more</h1>
          <p>Watch anywhere. Cancel anytime.</p>
          <p>
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          <div className="Form">
            <input
              type="email"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <button onClick={() => navigate("/signup2", { state: { email } })}>
              Get Started
              <span>
                <IoIosArrowForward />
              </span>
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Signup;
