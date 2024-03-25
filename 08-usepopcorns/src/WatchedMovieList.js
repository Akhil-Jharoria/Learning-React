export default function WatchedMovieList({ movie, onDelete }) {
  return (
    <li>
      <img src={movie.poster} alt={movie.title}></img>
      <h3>{movie.title}</h3>
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
        <button className="btn-delete" onClick={() => onDelete(movie.imdbId)}>
          X
        </button>
      </div>
    </li>
  );
}
