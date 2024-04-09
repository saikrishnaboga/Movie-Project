import React, { useState } from "react";
import { useEffect } from "react";
import classes from "./PopularMovieList.module.css";
import { POPULAR_API } from "../Constants";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
function Popular(props) {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState(false);
  const [searchStr, setsearchMovies] = useState("");
  const [isSearchBtnClicked, setSearchBtnClicked] = useState(false);
  const [searchedMovies, setSearchedMovies] = useState([]);

  const [APIURL, setAPIURL] = useState(
    (props.topRatedAPIUrl && props.topRatedAPIUrl) ||
      (props.upComingAPIurl && props.upComingAPIurl) ||
      POPULAR_API
  );

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetch(APIURL);
        const json = await data.json();
        setMovies(json.results);
        props.moviesList(json.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMovies();
    if (isSearchBtnClicked) {
      searchMovieResults();
    }
  }, []);
  const searchMovieResults = () => {
    setSearchBtnClicked(true);
    setSearchMovie(false);
    let movieDetails = movies.find(
      (el, index) => el.title.toLowerCase() === searchStr.toLowerCase()
    );
    setMovies([movieDetails]);
  };
  const searchMoviesByName = (e) => {
    setSearchMovie(true);
    setsearchMovies(e.target.value);
    let searchResults = movies.filter((el, index) =>
      el.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    console.log(searchResults);
    setSearchedMovies(searchResults);
  };
  return (
    <div>
      <div>
        <div className={styles.navigationLinks}>
          <div>MovieDb</div>
          <div>
            <ul className={styles.navigationLinks}>
              <li>
                <a href="/"> Popular</a>
              </li>
              <li>
                <a href="/toprated" className="">
                  Top Rated
                </a>
              </li>
              <li>
                <a href="/upcoming" className="">
                  Upcoming
                </a>
              </li>
              <li>
                <input
                  type="text"
                  value={searchStr}
                  onChange={(e) => searchMoviesByName(e)}
                />
              </li>
              <li>
                <button onClick={searchMovieResults}>Search</button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {searchMovie && searchedMovies ? (
        <div className={classes.movieItems}>
          {searchedMovies.map((movie, index) => {
            return (
              <Link key={movie.id} to={`movieDetails/${movie.id}`}>
                <div className={classes.movieCard}>
                  <ul>
                    <li>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt=""
                        className="src"
                        width={200}
                        height={200}
                      />
                    </li>
                    <li>
                      <p>{movie.title}</p>
                    </li>
                    <li>Rating {Number(movie.vote_average).toFixed(1)}</li>
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className={classes.movieItems}>
          {movies.map((movie, index) => {
            return (
              <Link to={`movie/${movie.id}`} key={movie.id}>
                {" "}
                <div className={classes.movieCard}>
                  <ul>
                    <li>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt=""
                        className="src"
                        width={200}
                        height={200}
                      />
                    </li>
                    <li>
                      <p>{movie.title}</p>
                    </li>
                    <li>Rating {Number(movie.vote_average).toFixed(1)}</li>
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Popular;
