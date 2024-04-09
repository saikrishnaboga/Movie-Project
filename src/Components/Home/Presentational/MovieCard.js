import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from "./MovieCard.module.css";
import Header from "./Header";

function MovieCard() {
  const [displayMovieDetails, setDisplayMovieDetails] = useState([]);
  const [castDetails, setCastDetails] = useState([]);

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=920489be937d5b0b110866286cfa45c2&language=en-US&page=1`
        );
        const json = await data.json();
        setDisplayMovieDetails([json]);
      } catch (error) {
        console.log(error);
      }
      try {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=920489be937d5b0b110866286cfa45c2&language=en-US&page=1`
        );
        const json = await data.json();
        setCastDetails([json][0].cast);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovieDetails();
  }, []);
  console.log(displayMovieDetails);
  console.log(castDetails);
  return (
    <div>
      {displayMovieDetails.map((details, index) => {
        return (
          <div>
            <div className={classes.movieCard}>
              <div className={classes.movieDetails}>
                <div className={classes.moviePoster}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
                    alt=""
                  />
                </div>
                <div>
                  <ul className={classes.texts}>
                    <li>
                      {" "}
                      <h1>{details.title}</h1>
                    </li>
                    <li>
                      {" "}
                      <h2>Rating {Number(details.vote_average).toFixed(1)}</h2>
                    </li>
                    <li>
                      {" "}
                      <h3 className={classes.minsAndGenres}>
                        {details.runtime}mins{" "}
                        {details.genres.map((el, id) => {
                          return (
                            <div className={classes.genres}>
                              <span>{el.name}</span>
                            </div>
                          );
                        })}{" "}
                      </h3>
                    </li>
                    <li>
                      {" "}
                      <h3>Release Date:{details.release_date}</h3>
                    </li>
                    <li></li>
                  </ul>
                </div>
              </div>
              <img
                src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`}
                alt=""
              />
            </div>

            <div className={classes.castList}>
              {castDetails.map((details, index) => {
                return (
                  <ul>
                    <li>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${details.profile_path}`}
                        alt=""
                        className="src"
                        width={200}
                      />
                    </li>
                    <li>{details.name}</li>
                    <li>{details.character}</li>
                  </ul>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MovieCard;
