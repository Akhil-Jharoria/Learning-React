import { useQuize } from "./Context/QuizeContext";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuize();
  const currentQuestion = questions[index];
  return (
    <div>
      <h4>{currentQuestion.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
