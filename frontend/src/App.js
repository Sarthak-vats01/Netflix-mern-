// App.js
import React, { useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Signup2 from "./pages/signup2";
import Netflix from "./pages/netflix";
import Player from "./components/Player";
import TvShows from "./pages/tvShows";
import Movies from "./pages/movies";

function RedirectToSignup() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/signup");
  }, [navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToSignup />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup2" element={<Signup2 />} />

        {<Route path="/home/:id" element={<Netflix />} />}

        <Route path="/player" element={<Player />} />
        <Route path="/tv/:id" element={<TvShows />} />
        <Route path="/movies/:id" element={<Movies />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
