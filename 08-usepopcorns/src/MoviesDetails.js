import { useEffect, useState } from "react";
import Loader from "./Loader";
import StartRating from "./StartRating";

const Key = "ebe9c8ec";
export default function MoviesDetails({
  selectedId,
  onClose,
  onAddwatch,
  watchedMovies,
}) {
  const [movie, setmovie] = useState({});
  const [loading, setloading] = useState(false);
  const [userRating, setuserRating] = useState("");

  const iswatched = watchedMovies
    .map((curr) => curr.imdbId)
    .includes(selectedId);

  const watchedUserRating = watchedMovies.find(
    (curr) => curr.imdbId === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function addtoList() {
    const newWatchmovie = {
      imdbId: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating: Number(userRating),
    };
    onAddwatch(newWatchmovie);
    onClose();
  }

  useEffect(
    function () {
      function callback(event) {
        if (event.code === "Escape") {
          onClose();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onClose]
  );
  useEffect(
    function () {
      async function getDetails() {
        setloading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${Key}&i=${selectedId}`
        );

        const data = await res.json();
        setmovie(data);
        setloading(false);
      }
      getDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );
  return (
    <div className="details">
      {loading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!iswatched ? (
                <>
                  <StartRating
                    maxRating={10}
                    size={24}
                    onsetRating={setuserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={addtoList}>
                      ➕ Add to List
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You Rated This Movie {watchedUserRating}
                  <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
