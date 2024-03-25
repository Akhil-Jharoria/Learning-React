import Navbar from "./Navbar";
import Main from "./Main";
import NumResult from "./NumResult";
import SearchBar from "./SearchBar";
import Box from "./Box";
import FoundMovies from "./FoundMovies";
import Summary from "./Summary";
import WatchList from "./WatchList";
import Loader from "./Loader";
import Error from "./Error";
import MoviesDetails from "./MoviesDetails";
import { useEffect, useState } from "react";
// const tempMovieData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt0133093",
//     Title: "The Matrix",
//     Year: "1999",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
//   },
//   {
//     imdbID: "tt6751668",
//     Title: "Parasite",
//     Year: "2019",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
//   },
// ];
// const tempWatchedData = [
//   {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },
//   {
//     imdbID: "tt0088763",
//     Title: "Back to the Future",
//     Year: "1985",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9,
//   },
// ];

const Key = "ebe9c8ec";
export default function App() {
  const [moviesItems, setmoviesItems] = useState([]);
  const [watchedMovies, setwatchedMovies] = useState([]);
  const [isLoaded, setIsloaded] = useState(false);
  const [error, setError] = useState("");
  const [query, setquery] = useState("");
  const [selectedId, setselectedId] = useState(null);

  function handleSelect(id) {
    setselectedId((selectedId) => (selectedId === id ? null : id));
  }

  function closeDetails() {
    setselectedId(null);
  }

  function handleAddwatched(movie) {
    setwatchedMovies((watchedMovies) => [...watchedMovies, movie]);

    // localStorage.setItem(
    //   "watchedMovies",
    //   JSON.stringify([...watchedMovies, movie])
    // );
  }

  function hanldeDeleteWatched(id) {
    setwatchedMovies((watchedMovies) =>
      watchedMovies.filter((curr) => curr.imdbId !== id)
    );
  }

  useEffect(
    function () {
      localStorage.setItem("watchedMovies", JSON.stringify(watchedMovies));
    },
    [watchedMovies]
  );

  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsloaded(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${Key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("SomeThings Went Wrong while Fetching Movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movies Not Found");
          setmoviesItems(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsloaded(false);
        }
      }

      if (query.length < 3) {
        setmoviesItems([]);
        setError("");
        return;
      }

      closeDetails();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <Navbar>
        <SearchBar query={query} setquery={setquery} />
        <NumResult moviesItems={moviesItems} />
      </Navbar>
      <Main>
        <Box>
          {/* {isLoaded ? <Loader /> : <FoundMovies moviesItems={moviesItems} />} */}
          {isLoaded && <Loader />}
          {!isLoaded && !error && (
            <FoundMovies moviesItems={moviesItems} onSelect={handleSelect} />
          )}
          {error && <Error message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MoviesDetails
              selectedId={selectedId}
              onClose={closeDetails}
              onAddwatch={handleAddwatched}
              watchedMovies={watchedMovies}
            />
          ) : (
            <>
              <Summary watchedMovies={watchedMovies} />
              <WatchList
                movies={watchedMovies}
                onDelete={hanldeDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
