function Progress({ index, numQuestion, Score, totalScore, answer }) {
  return (
    <div className="progress">
      <progress
        max={numQuestion}
        value={index + Number(answer !== null)}
      ></progress>
      <p>
        <strong>{index + 1}</strong> / {numQuestion}
      </p>
      <p>
        {Score}/{totalScore}
      </p>
    </div>
  );
}

export default Progress;
