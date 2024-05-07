function FinsishScreen({ Score, totalScore, highScore, dispatch }) {
  const percentage = (Score / totalScore) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <div>
        <p className="result">
          <span>{emoji}</span> You Score {Score} out of {totalScore}{" "}
          {Math.ceil(percentage)}%
        </p>
        <p className="highscore">(HighScore: {highScore} points)</p>
      </div>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinsishScreen;
