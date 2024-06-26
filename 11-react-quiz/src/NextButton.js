import { useQuize } from "./Context/QuizeContext";

function NextButton() {
  const { index, length, dispatch } = useQuize();
  if (index < length - 1) {
    return (
      <div
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </div>
    );
  }
  if (index === length - 1) {
    return (
      <div
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </div>
    );
  }
}

export default NextButton;
