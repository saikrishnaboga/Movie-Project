import React from "react";
import Popular from "./Presentational/PopularMoviesList";
function MoviesListContainer(props) {
  return (
    <div>
      <Popular
        topRatedAPIUrl={props.topRatedAPIUrl}
        upComingAPIurl={props.upComingAPIurl}
        moviesList={props.moviesList}
      />
    </div>
  );
}

export default MoviesListContainer;
