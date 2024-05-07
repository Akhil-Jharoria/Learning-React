import { useEffect } from "react";

function Timer({ secondRemaining, dispatch }) {
  const min = Math.floor(secondRemaining / 60);
  const sec = Math.floor(secondRemaining % 60);
  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "time" });
      }, 1000);

      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {min}:{sec}
    </div>
  );
}

export default Timer;
