import { useEffect, useRef } from "react";
import { useKeyPress } from "./useKeyPress";

export default function SearchBar({ query, setquery }) {
  const inputEl = useRef(null);

  useKeyPress("Enter", function () {
    if (document.activeElement === inputEl) return;
    inputEl.current.focus();
    setquery("");
  });

  function handleSearch(event) {
    setquery(event.target.value);
  }

  // useEffect(
  //   function () {
  //     function callback(event) {
  //       if (document.activeElement === inputEl) return;
  //       if (event.code === "Enter") {
  //         inputEl.current.focus();
  //         setquery("");
  //       }
  //     }
  //     document.addEventListener("keydown", callback);

  //     return () => document.removeEventListener("keydown", callback);
  //   },
  //   [setquery]
  // );
  // useEffect(function () {
  //   const el = document.querySelector(".search");
  //   // console.log(el);
  //   el.focus();
  // }, []);

  return (
    <input
      className="search"
      placeholder="Search Movie....."
      value={query}
      onChange={handleSearch}
      ref={inputEl}
    ></input>
  );
}
