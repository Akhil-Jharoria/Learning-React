import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinsishScreen from "./FinsishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const SECS_PER_QUES = 30;
const initialState = {
  questions: [],

  //loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer: null,
  Score: 0,
  highScore: 0,
  secondRemaining: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "startquiz":
      return {
        ...state,
        status: "active",
        secondRemaining: state.questions.length * SECS_PER_QUES,
      };
    case "newAnswer":
      const currqus = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        Score:
          action.payload === currqus.correctOption
            ? state.Score + currqus.points
            : state.Score,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finished":
      return {
        ...state,
        status: "finished",
        highScore:
          state.Score > state.highScore ? state.Score : state.highScore,
      };
    case "restart":
      return {
        ...state,
        status: "ready",
        index: 0,
        answer: null,
        Score: 0,
        secondRemaining: state.questions.length * SECS_PER_QUES,
      };
    case "time":
      return {
        ...state,
        secondRemaining: state.secondRemaining - 1,
        status: state.secondRemaining === 0 ? "finished" : state.status,
      };

    default:
      return new Error("Action is Unknown");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const {
    questions,
    status,
    index,
    answer,
    Score,
    highScore,
    secondRemaining,
  } = state;
  const numQuestion = questions.length;
  const totalScore = questions.reduce((prev, curr) => prev + curr.points, 0);

  function handleStartClick() {
    dispatch({ type: "startquiz" });
  }

  useEffect(function () {
    async function getData() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        dispatch({ type: "dataRecived", payload: data });
      } catch (err) {
        dispatch({ type: "dataFailed" });
      } finally {
      }
    }

    getData();
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen length={numQuestion} handleClick={handleStartClick} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestion={numQuestion}
              Score={Score}
              totalScore={totalScore}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondRemaining={secondRemaining} dispatch={dispatch} />
              {answer !== null && (
                <NextButton
                  index={index}
                  numQuestion={numQuestion}
                  dispatch={dispatch}
                />
              )}
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinsishScreen
            Score={Score}
            totalScore={totalScore}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
