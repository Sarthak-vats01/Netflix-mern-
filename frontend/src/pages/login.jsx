import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import BackgroundImage from "../assets/login.jpg";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { UserURL } from "../utils/constant";

const Container = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  width: 100vw;

  .logo {
    position: absolute;
    top: 1%;
    left: 10%;
    height: 5rem;
    width: auto;
    cursor: pointer;
  }

  .backgroundImg {
    filter: brightness(0.45);
  }

  .Content {
    position: absolute;
    top: 13%;
    left: 35%;
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 700px;
    color: white;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.5);

    .form-content {
      padding: 30px 60px 0px 60px;

      h1 {
        color: white;
      }
    }

    .form {
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 0px 0px;

      input {
        width: 100%;
        line-height: 3.2;
        font-size: 1rem;
        margin-bottom: 15px;
        background-color: transparent;
        border: 1px solid #929090;
        border-radius: 5px;
        color: white;

        ::placeholder {
          // color: white !important;
          align-items: center;
        }
      }

      button {
        font-weight: 500;
        min-height: 2.5rem;
        padding: 0.375rem 1rem;
        background: rgb(229, 9, 20);
        color: rgb(255, 255, 255);
        vertical-align: text-top;
        width: 100%;
        font-size: 1rem;
        border-radius: 0.25rem;
        border: none;
      }
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`${UserURL}/signin`, {
        username: email,
        password: password,
      });

      console.log(response.data.token);
      localStorage.setItem("token", response.data.token);
      navigate(`/home/${response.data.userId}`);
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="loginPage">
      <Container>
        <img src={BackgroundImage} alt="" className="backgroundImg" />
        <img
          src={Logo}
          alt=""
          className="logo"
          onClick={() => navigate("/signup")}
        />

        <div className="Content">
          <div className="form-content">
            <h1>Sign In</h1>
            <div className="form">
              <input
                type="email"
                id="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={signin}>Sign In</button>
              <p>Forgot password?</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Login;
