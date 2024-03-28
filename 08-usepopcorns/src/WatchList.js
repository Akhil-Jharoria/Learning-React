import WatchedMovieList from "./WatchedMovieList";

export default function WatchList({ movies, onDelete }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <WatchedMovieList
          movie={movie}
          onDelete={onDelete}
          key={movie.imdbId}
        />
      ))}
    </ul>
  );
}
