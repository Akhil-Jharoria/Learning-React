import { useState, useEffect } from "react";

const Key = "ebe9c8ec";
export function useMoviesfetch(query, callback) {
  const [moviesItems, setmoviesItems] = useState([]);
  const [isLoaded, setIsloaded] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsloaded(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${Key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("SomeThings Went Wrong while Fetching Movies");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movies Not Found");
          setmoviesItems(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsloaded(false);
        }
      }

      if (query.length < 3) {
        setmoviesItems([]);
        setError("");
        return;
      }

      //   closeDetails();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { moviesItems, isLoaded, error };
}
