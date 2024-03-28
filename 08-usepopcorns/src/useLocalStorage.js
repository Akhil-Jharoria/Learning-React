import { useEffect, useState } from "react";

export function useLocalStorage(intitialstate, key) {
  // const [watchedMovies, setwatchedMovies] = useState([]);

  const [value, setvalue] = useState(function () {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : intitialstate;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setvalue];
}
