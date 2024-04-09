import React, { useState } from "react";
import styles from "./Header.module.css";

function Header(props) {
  const [searchStr, setsearchMovies] = useState("");

  return (
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
                onChange={(e) => setsearchMovies(e.target.value)}
              />
            </li>
            <li>
              <button onClick={props.searchMovieResults(searchStr)}>
                Search
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
