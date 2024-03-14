export default function WatchedMovieList({ movie }) {
  return (
    <li>
      <img src={movie.Poster} alt={movie.Title}></img>
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️ {movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟{movie.userRating}</span>
        </p>
        <p>
          <span>⏳{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}
