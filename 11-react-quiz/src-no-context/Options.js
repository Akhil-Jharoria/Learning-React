function Options({ question, dispatch, answer }) {
  const hasAnswer = answer !== null;
  return (
    <div className="options">
      {question.options.map((opt, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswer
              ? index === question.correctOption
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
