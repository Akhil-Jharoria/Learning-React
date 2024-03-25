export default function SearchBar({ query, setquery }) {
  function handleSearch(event) {
    setquery(event.target.value);
  }

  return (
    <input
      className="search"
      placeholder="Search Movie....."
      value={query}
      onChange={handleSearch}
    ></input>
  );
}
