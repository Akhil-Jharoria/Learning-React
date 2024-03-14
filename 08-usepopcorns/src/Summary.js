const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function Summary({ watchedMovies }) {
  const avgImdbRating = average(watchedMovies.map((movie) => movie.imdbRating));
  const avgUserRating = average(watchedMovies.map((movie) => movie.userRating));
  const avgRuntime = average(watchedMovies.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣{watchedMovies.length}</span>
          <span> movies</span>
        </p>
        <p>
          <span>⭐️{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟{avgUserRating}</span>
        </p>
        <p>
          <span>⏳{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
