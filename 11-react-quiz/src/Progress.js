import { useQuize } from "./Context/QuizeContext";

function Progress() {
  const { index, length, Score, totalScore, answer } = useQuize();
  return (
    <div className="progress">
      <progress max={length} value={index + Number(answer !== null)}></progress>
      <p>
        <strong>{index + 1}</strong> / {length}
      </p>
      <p>
        {Score}/{totalScore}
      </p>
    </div>
  );
}

export default Progress;
