export default function MoviesList({ movies }) {
  return (
    <li>
      <img src={movies.Poster} alt={movies.Title}></img>
      <h3>{movies.Title}</h3>
      <p>
        <span>🗓</span>
        <span>{movies.Year}</span>
      </p>
    </li>
  );
}
