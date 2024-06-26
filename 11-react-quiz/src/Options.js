import { useQuize } from "./Context/QuizeContext";

function Options() {
  const { questions, answer, index, dispatch } = useQuize();
  const currentQuestion = questions[index];
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {currentQuestion.options.map((opt, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswer
              ? index === currentQuestion.correctOption
                ? "correct"
                : "wrong"
              : ""
          } `}
          disabled={hasAnswer}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={index}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
