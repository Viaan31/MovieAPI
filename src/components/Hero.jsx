import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";
import "./Hero.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Carousel1 from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Hero = ({ movies, token }) => {
  const navigate = useNavigate();
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  if (!movies) {
    return;
  }
  return (
    <div>
      <Carousel sx={{ width: "100%" }}>
        {movies?.map((movie) => {
          return (
            <Paper>
              <div className="movie-card-container">
                <div
                  className="movie-card"
                  style={{ "--img": `url(${movie.backdrops[0]})` }}
                >
                  <div className="movie-detail">
                    <div className="movie-poster">
                      <img src={movie.poster} alt="" />
                    </div>

                    <div className="movie-buttons-container">
                      <Link
                        to={`/Trailer/${movie.trailerLink.substring(
                          movie.trailerLink.length - 11
                        )}`}
                      >
                        <div className="play-button-icon-container">
                          <FontAwesomeIcon
                            className="play-button-icon"
                            icon={faCirclePlay}
                          />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="movie-title">
                  <h3> {movie.title}</h3>
                </div>
              </div>
            </Paper>
          );
        })}
      </Carousel>
      <h1 className="home-title">Latest Movies </h1>
      {console.log("movie", movies)}
      <Carousel1 responsive={responsive}>
        {movies?.map((movie) => (
          <div className="poster">
            <img
              src={movie?.poster}
              alt="poster"
              onClick={() => navigate(`/Reviews/${movie.imdbId}`)}
              style={{ cursor: "pointer" }}
            />
          </div>
        ))}
      </Carousel1>
    </div>
  );
};

export default Hero;
