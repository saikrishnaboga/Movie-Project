import logo from "./logo.svg";
import "./App.css";
import MoviesListContainer from "./Components/Home/MoviesListContainer";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  POPULAR_API,
  TOPRATED_API,
  UPCOMING,
} from "./Components/Home/Constants";
import { useEffect, useState } from "react";
import MovieCard from "./Components/Home/Presentational/MovieCard";

function App() {
  const [searchList, setSearchList] = useState([]);
  const [movieDetails, setMovieDetails] = useState([]);
  const moviesList = (moviesData) => {
    if (moviesData) {
      setSearchList(moviesData);
    }
  };

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MoviesListContainer moviesList={moviesList} />,
    },
    {
      path: "/toprated",
      element: (
        <MoviesListContainer
          topRatedAPIUrl={TOPRATED_API}
          moviesList={moviesList}
        />
      ),
    },
    {
      path: "/upcoming",
      element: (
        <MoviesListContainer
          upComingAPIurl={UPCOMING}
          moviesList={moviesList}
        />
      ),
    },
    {
      path: "movie/:id",
      element: <MovieCard />,
    },
    {
      path: "toprated/movie/:id",
      element: <MovieCard />,
    },
    {
      path: "upcoming/movie/:id",
      element: <MovieCard />,
    },
  ]);
  console.log(searchList);
  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
