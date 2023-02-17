import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import ReviewForm from "./ReviewForm";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import "./Hero.css";
import { Rating } from "@mui/material";
import Carousel from "react-multi-carousel";
import StarRateIcon from "@mui/icons-material/StarRate";
const Review = ({ getMovieData, movie, reviews, setReviews, token }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;
  console.log("id", movieId);

  useEffect(() => {
    getMovieData(movieId);
  }, []);
  const addReview = () => {
    console.log("revtext", revText?.current);
    const rev = revText?.current;
    console.log("rev", rev?.value);
    axios.post(`http://localhost:8080/api/reviews`, {
      reviewBody: rev?.value,
      imdbId: movieId,
      rating: value.toString(),
    });
    const updateReview = [
      ...reviews,
      { body: rev?.value, rating: value.toString() },
    ];
    rev.value = "";
    setReviews(updateReview);
  };
  const [value, setValue] = useState(2);
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
  if (!movie) {
    return;
  }
  let prev = 0;
  let sum = 0;
  let avg = 0;
  reviews.map(
    (item) => ((prev = +item.rating), console.log("prev", prev), (sum += prev))
  );
  avg = sum / reviews.length;
  return (
    <Container style={{ marginTop: "30px" }}>
      {console.log("reviews", reviews)}
      {console.log("rating", sum)}
      {console.log("average", avg)}
      <Row className="mt-2">
        <Col>
          <img
            src={movie?.poster}
            alt=""
            style={{ width: "-webkit-fill-available" }}
          />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <h2>{movie?.title}</h2>
                </Col>
                <hr />
              </Row>
              <Row>
                <Col>Release Date: {movie?.releaseDate}</Col>
              </Row>
              <Row>
                <div className="movie-genre-container">
                  {movie?.genres?.map((item) => (
                    <div className="movie-genre">{item}</div>
                  ))}
                </div>
                <Row>
                  {avg > 0 ? <Col>Rating: {avg.toFixed(2)}</Col> : null}
                </Row>
              </Row>
              {token ? <h5>Rate:</h5> : null}
              <Row>
                <Col>
                  {token ? (
                    <Rating
                      name="customized-10"
                      max={10}
                      value={value}
                      onChange={(newValue) => {
                        setValue(newValue);
                      }}
                    />
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  {token ? (
                    <ReviewForm
                      handleSubmit={addReview}
                      revText={revText}
                      labeltext="Write a review?"
                    />
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          <h3>User Reviews:</h3>
          {reviews?.map((r) => {
            return (
              <>
                <Row className="movie-review">
                  <Col>
                    <div className="movie-review-container">
                      {r.rating}
                      <StarRateIcon />
                    </div>
                  </Col>
                  <Col style={{ overflowWrap: "anywhere" }}>{r.body}</Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <hr />

      <Row>
        <Col>
          <Carousel responsive={responsive}>
            {movie?.backdrops?.map((item) => (
              <img className="image-gallery" src={item} alt="" />
            ))}
          </Carousel>
        </Col>
      </Row>
      {console.log("value", value)}
    </Container>
  );
};

export default Review;
