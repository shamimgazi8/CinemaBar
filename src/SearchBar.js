import React, { useEffect, useRef } from "react";

export function SearchBar({
  setMovies,
  setLoding,
  setresponse,
  search,
  setSeacrch,
  setSeacrchWord,
}) {
  const inputel = useRef(null);
  useEffect(function () {
    inputel.current.focus();
  }, []);
  function handelClick(e) {
    e.preventDefault();
    setSeacrchWord(search);
    async function fetchMovies() {
      if (search === "") {
        alert("Please type Movie Name into the Search box! ");
        return;
      }
      setLoding(true);
      const res = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=90d6fd24&s=${search}`
      );
      const data = await res.json();
      if (data.Response === "False") {
        setresponse(false);
      } else {
        setresponse(true);
      }

      setMovies(data.Search);
      setLoding(false);
      setSeacrch("");
    }
    return fetchMovies();
  }
  return (
    <form className="search_bar" onSubmit={handelClick}>
      <input
        className="search "
        placeholder="Search Movies..."
        onChange={(e) => setSeacrch(e.target.value)}
        value={search}
        ref={inputel}
      ></input>
      <a onClick={handelClick}>
        <span>Go!</span>
      </a>
    </form>
  );
}
