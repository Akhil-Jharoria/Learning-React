export default function NumResult({ moviesItems }) {
  return (
    <div className="num-results">
      <p>
        Found <strong>{moviesItems.length}</strong> top results
      </p>
    </div>
  );
}
