import React, { useEffect, useState } from "react";
import loding from "../src/e.png";
import ReactDOM from "react-dom/client";
import StarRating from "./starRating";

import "./index.css";
import "./index.scss";
import { Error } from "./Error";
import { Waring } from "./Waring";
import { Loding } from "./Loding";

import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";
import { Nav } from "./Nav";
import { Uselocalstg } from "./uselocalstg";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSeacrch] = useState("");
  const [searchWord, setSeacrchWord] = useState("");
  const [isLoding, setLoding] = useState(false);

  const [error, seterror] = useState(false);
  const [response, setresponse] = useState(true);
  const [selectedId, setselectedId] = useState(null);

  const [watched, setwatched] = Uselocalstg([], "watched");
  // const [watched, setwatched] = useState([]);
  // const [watched, setwatched] = useState(function () {
  //   const storevalue = localStorage.getItem("watched");
  //   return JSON.parse(storevalue);
  // });

  function handelselectedClick(id) {
    setselectedId(id);
  }
  function handelclose() {
    setselectedId(null);
  }
  function handeladdmovies(newaddwatched) {
    setwatched((watched) => [...watched, newaddwatched]);

    // watched.length === 0
    //   ? setwatched((watched) => [...watched, newaddwatched])
    //   : watched.map((mov) =>
    //       mov.id === newaddwatched.id
    //         ? alert("You already add this movie to your List")
    //         : setwatched((watched) => [...watched, newaddwatched])
    //     );
  }

  function handelremove(id) {
    if (window.confirm("Are you sure you want to Remove this movie?")) {
      setwatched((watched) => watched.filter((mov) => mov.id !== id));
    } else {
      return;
    }
  }

  useEffect(function () {
    async function defaultMovies() {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?i=tt3896198&apikey=90d6fd24&s=`
        );
        if (!res.ok) throw new Error("Something is with fetching Data");
        const data = await res.json();
        setMovies(data.Search);
      } catch (error) {
        console.error(error.message);
        seterror(true);
      }
    }
    defaultMovies();
    // fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=${KEY}&s=Interstellar`)
    //   .then((res) => res.json())
    //   .then((data) => setMovies(data.Search));
  }, []);

  return (
    <div>
      <Nav>
        <Logo />
        <SearchBar
          setMovies={setMovies}
          setLoding={setLoding}
          setresponse={setresponse}
          setSeacrch={setSeacrch}
          search={search}
          setSeacrchWord={setSeacrchWord}
          searchWord={searchWord}
        />
        <Btn_Bookmark movies={movies} />
      </Nav>
      <Body
        movies={movies}
        key={Date.toString}
        isLoding={isLoding}
        response={response}
        searchWord={searchWord}
        error={error}
        selectedId={selectedId}
        setselectedId={setselectedId}
        handelselectedClick={handelselectedClick}
        handelclose={handelclose}
        setLoding={setLoding}
        handeladdmovies={handeladdmovies}
        watched={watched}
        handelremove={handelremove}
      />
    </div>
  );
}
function MoviesDetails({ watched, handelremove }) {
  let rate = [];
  let time = [];

  const avgRate = function (watched) {
    watched.map((mov) => {
      rate.push(mov.rate);
      isNaN(mov.runtime) ? time.push(0) : time.push(mov.runtime);
    });
  };
  avgRate(watched);

  return (
    <div className="details" id="style-4">
      <div className="watched_list">
        <p>Movies You Watched</p>
        <div className="list_details">
          <p>
            🎬 Movies : <span>{watched.length}</span>
          </p>
          <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p>
            ⌚Time :{" "}
            <span>
              {time.length > 0
                ? time.reduce((a, b) => {
                    const total = a + b;
                    return total;
                  })
                : 0}
            </span>{" "}
            min
          </p>
          {/* <p>
            🌟Rating :{" "}
            <span>
              {rate.length > 0
                ? rate.reduce((a, b) => {
                    return a + b;
                  })
                : 0}
            </span>
          </p> */}
        </div>
      </div>

      {watched.map((mov) => (
        <div className="watchedList" key={mov.id}>
          <img src={mov.poster} />
          <div className="titel-cross">
            <p>{mov.titel}</p>
            <button className="cross" onClick={() => handelremove(mov.id)}>
              ❌
            </button>
          </div>

          <div className="grid-arr">
            <p>⭐{mov.imdbRating}</p>
            <p> ⌚{mov.runtime} MIN</p>
            <p>🌟{mov.rate}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
function Btn_Bookmark({ movies }) {
  return (
    <div className="nav_link">
      <button className="glow-on-hover btn-1">
        Found {movies ? movies.length : "0"} movie
      </button>
    </div>
  );
}
function SearchResult({ movies, setselectedId, handelselectedClick }) {
  return (
    <div className="results" id="style-4">
      {!movies
        ? []
        : movies.map((mov) => (
            <div
              key={mov.imdbID}
              className="result"
              onClick={() => handelselectedClick(mov.imdbID)}
            >
              <div className="poster">
                <img src={mov.Poster} />
              </div>
              <div className="movie_name">
                <div className="titel-box">
                  <h1 className="titel">{mov.Title}</h1>
                </div>
                <div className="movie_year">
                  <p>📅 {mov.Year}</p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}
function GetMovieDetails({ id, handeladdmovies, handelclose, watched }) {
  const [moviedata, setmoviedata] = useState({});
  const [isLoding1, setLoding1] = useState(false);
  const iswatched = watched.map((mov) => mov.id).includes(id);
  const [movieRate, setMovieRate] = useState(0);
  const {
    Actors: actor,
    Awards: award,
    BoxOffice: boxoffice,
    Country: country,
    Director: director,
    Genre: genre,
    Poster: poster,
    Released: relesed,
    Runtime: runtime,
    Title: titel,
    Year: year,
    Plot: Plot,
    imdbRating: imdbRating,
    imdbID: imdbID,
  } = moviedata;
  useEffect(
    function () {
      const callback = function (e) {
        if (e.code === "Escape") {
          handelclose();
        }
      };
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [handelclose]
  );
  useEffect(
    function () {
      setLoding1(true);
      async function getdata() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=90d6fd24&i=${id}`
        );

        const data = await res.json();

        setmoviedata(data);
        setLoding1(false);
      }
      getdata();
    },
    [id]
  );
  useEffect(
    function () {
      if (!titel) {
        return;
      }
      document.title = `Movie | ${titel}`;
      return function () {
        document.title = "CinemaBar";
      };
    },
    [titel]
  );

  function handeladd() {
    const newwatchedMovie = {
      id: imdbID,
      titel,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      rate: Number(movieRate),
    };
    handeladdmovies(newwatchedMovie);
    handelclose();
  }

  return (
    <>
      {isLoding1 ? (
        <div className="loading_comp">
          <Loding />
        </div>
      ) : (
        <div className="mov_info">
          <button onClick={() => handelclose()} className="btn-back">
            &larr;
          </button>
          <div className="poster_titel">
            <div className="poster1">
              <img src={poster}></img>
            </div>
            <div className="titel1">
              <h1>{titel}</h1>
              <p>
                {relesed} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐ {imdbRating} imdbRating</p>
            </div>
          </div>
          <div className="info">
            <div className="rating">
              <div>
                {!iswatched ? (
                  <>
                    <StarRating
                      messages={[
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                        "10",
                      ]}
                      maxrating={10}
                      color="yellow"
                      setRating={setMovieRate}
                      size={42}
                    />
                    {movieRate > 0 && (
                      <button className="btn-addtolist" onClick={handeladd}>
                        {" "}
                        + Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p className="alreadyadd">
                    You already add this movie to Your list 🙌
                  </p>
                )}
              </div>
            </div>

            <p>{Plot}</p>
            <p>Acting by : {actor}</p>
            <p>Directed by {director}</p>
          </div>
        </div>
      )}
    </>
  );
}
function SelectedMovie({ selectedId, handelclose, handeladdmovies, watched }) {
  return (
    <>
      <div className="selectedmovie">
        <GetMovieDetails
          id={selectedId}
          handeladdmovies={handeladdmovies}
          handelclose={handelclose}
          watched={watched}
        />
      </div>
    </>
  );
}
function Body({
  movies,
  isLoding,
  response,
  searchWord,
  error,
  selectedId,
  setselectedId,
  handelselectedClick,
  handelclose,
  handeladdmovies,
  watched,
  handelremove,
}) {
  return (
    <div className="body">
      <div className="movie_slider">
        <div className="movie_list">
          <main className="container">
            <section className="slideshow">
              <div className="slide"></div>
              <div className="slide"></div>
              <div className="slide"></div>
              <div className="slide"></div>
              <div className="slide"></div>
              <div className="slide"></div>
              <div className="slide"></div>
              <div className="slide"></div>
              <div className="slide"></div>
              <div className="overlay">
                <div className="search_result">
                  {error ? (
                    <Error />
                  ) : !isLoding ? (
                    !response ? (
                      <Waring searchWord={searchWord} />
                    ) : (
                      <SearchResult
                        movies={movies}
                        setselectedId={setselectedId}
                        handelselectedClick={handelselectedClick}
                      />
                    )
                  ) : (
                    <Loding />
                  )}
                </div>
                <div className="movie_details">
                  {selectedId ? (
                    // <div className="lds-roller"></div>
                    <SelectedMovie
                      selectedId={selectedId}
                      handelclose={handelclose}
                      handeladdmovies={handeladdmovies}
                      watched={watched}
                    />
                  ) : (
                    <MoviesDetails
                      watched={watched}
                      handelremove={handelremove}
                    />
                  )}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
export default App;
