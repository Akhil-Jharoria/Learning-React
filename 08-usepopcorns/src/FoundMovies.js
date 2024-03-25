import MoviesList from "./MoviesList";

export default function FoundMovies({ moviesItems, onSelect }) {
  return (
    <ul className="list list-movies">
      {moviesItems.map((movies) => (
        <MoviesList movies={movies} onSelect={onSelect} key={movies.imdbID} />
      ))}
    </ul>
  );
}
