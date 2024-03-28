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
import { useState } from "react";
import { useMoviesfetch } from "./useMoviesfetch";
import { useLocalStorage } from "./useLocalStorage";

export default function App() {
  const [query, setquery] = useState("");
  const [selectedId, setselectedId] = useState(null);

  // const [watchedMovies, setwatchedMovies] = useState([]);

  //custom hooks
  const { moviesItems, isLoaded, error } = useMoviesfetch(query, closeDetails);
  const [watchedMovies, setwatchedMovies] = useLocalStorage([], "watched");

  function handleSelect(id) {
    setselectedId((selectedId) => (selectedId === id ? null : id));
  }

  function closeDetails() {
    setselectedId(null);
  }

  function handleAddwatched(movie) {
    setwatchedMovies((watchedMovies) => [...watchedMovies, movie]);
  }

  function hanldeDeleteWatched(id) {
    setwatchedMovies((watchedMovies) =>
      watchedMovies.filter((curr) => curr.imdbId !== id)
    );
  }

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
