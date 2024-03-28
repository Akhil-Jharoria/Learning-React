import { useEffect } from "react";

export function useKeyPress(keycode, functiontoCall) {
  useEffect(
    function () {
      function callback(event) {
        if (event.code.toLowerCase() === keycode.toLowerCase()) {
          functiontoCall();
        }
      }
      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [functiontoCall, keycode]
  );
}
