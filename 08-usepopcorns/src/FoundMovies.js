import MoviesList from "./MoviesList";

export default function FoundMovies({ moviesItems }) {
  return (
    <ul className="list">
      {moviesItems.map((movies) => (
        <MoviesList movies={movies} key={movies.imdbID} />
      ))}
    </ul>
  );
}
