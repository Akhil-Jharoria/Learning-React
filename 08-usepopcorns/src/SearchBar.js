import { useState } from "react";

export default function SearchBar() {
  const [query, setquery] = useState("");

  function handleSearch(event) {
    console.log(event.target.value);
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
