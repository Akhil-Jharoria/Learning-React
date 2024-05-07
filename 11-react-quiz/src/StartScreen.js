import { useQuize } from "./Context/QuizeContext";

function StartScreen() {
  const { length, handleStartClick } = useQuize();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{length} questions to test your React Mastry.</h3>
      <button className="btn btn-ui" onClick={handleStartClick}>
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
