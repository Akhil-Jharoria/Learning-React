function NextButton({ index, numQuestion, dispatch }) {
  if (index < numQuestion - 1) {
    return (
      <div
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </div>
    );
  }
  if (index === numQuestion - 1) {
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
