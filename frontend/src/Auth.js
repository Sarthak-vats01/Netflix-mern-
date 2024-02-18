// useAuthentication.js
import { useEffect, useState } from "react";
import { SERVER_URL } from "./utils/constant";
import axios from "axios";

function useAuthentication() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    console.log("checking authenticity of the user");
    const token = localStorage.getItem("token");

    console.log("Token in auth client", token);

    if (!token) {
      console.log("no token found, redirecting to login");
      setAuthenticated(false);
    } else {
      axios
        .get(`http://localhost:8000/authenticateToken/protected`, {
          headers: {
            Authorization: token,
          },
        })
        .then(() => {
          console.log("authentication successful");
          setAuthenticated(true);
        })
        .catch((err) => {
          console.log("error in Auth ", err);
          console.log("authentication failed");
          setAuthenticated(false);
        });
    }
  }, []);

  return { authenticated };
}

export default useAuthentication;
