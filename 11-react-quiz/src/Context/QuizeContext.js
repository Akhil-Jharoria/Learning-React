import { createContext, useContext, useEffect, useReducer } from "react";

const QuizeContext = createContext();
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

function QuizeContextProvider({ children }) {
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
  const length = questions.length;
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
    <QuizeContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        Score,
        highScore,
        secondRemaining,
        length,
        totalScore,
        handleStartClick,
        dispatch,
      }}
    >
      {children}
    </QuizeContext.Provider>
  );
}

function useQuize() {
  const context = useContext(QuizeContext);

  if (context === undefined)
    return new Error("Context is used outside the Provider");

  return context;
}
export { QuizeContextProvider, useQuize };
