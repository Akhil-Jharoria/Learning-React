import WatchedMovieList from "./WatchedMovieList";

export default function WatchList({ movies }) {
  return (
    <ul className="list">
      {movies.map((movie) => (
        <WatchedMovieList movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
