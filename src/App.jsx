import "./App.css";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import axios from "axios";
import Trailer from "./components/Trailer";
import Header from "./components/Header";
import Login from "./components/Login";
import Review from "./components/Review";
import Hero from "./components/Hero";

function App() {
  const [movies, setMovies] = useState();
  const [singleMovie, setSingleMovie] = useState();
  const [reviews, setReviews] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("userToken") ?? null);
  const getMovies = async () => {
    axios.get("http://localhost:8080/api/movies").then((res) => {
      console.log(res);
      setMovies(res.data);
    });
  };
  const getMovieData = (movieId) => {
    axios.get(`http://localhost:8080/api/movies/${movieId}`).then((res) => {
      console.log(res.data);
      setSingleMovie(res.data);
      setReviews(res.data.reviewIds);
    });
  };
  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="App">
      <Header token={token} setToken={setToken} />
      <Routes>
        <Route
          path="/login"
          element={<Login setToken={setToken} token={token} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Hero movies={movies} token={token} />} />
        <Route path="/trailer/:ytTrailerId" element={<Trailer />} />
        <Route
          path="/Reviews/:movieId"
          element={
            <Review
              getMovieData={getMovieData}
              reviews={reviews}
              setReviews={setReviews}
              movie={singleMovie}
              token={token}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
