import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <>
      <Steps />
    </>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isClose, setClose] = useState(false);

  function handleprevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handlenext() {
    if (step < 3) setStep((s) => s + 1);
  }

  function handleclose() {
    setClose((close) => !close);
  }

  return (
    <div className="steps">
      <button className="close" onClick={handleclose}>
        &times;
      </button>
      {isClose ? (
        <h3>Currently Closed</h3>
      ) : (
        <>
          <div className="numbers">
            <div className={step >= 1 ? "active" : " "}>1</div>
            <div className={step >= 2 ? "active" : " "}>2</div>
            <div className={step >= 3 ? "active" : " "}>3</div>
          </div>

          <StepMessage>
            {step}:{messages[step - 1]}
          </StepMessage>
          {/* Step {step} : {messages[step - 1]} */}

          <div className="buttons">
            {/* <button onClick={handleprevious}>Previous</button> */}
            <Button onClick={handleprevious}>
              <span>👈</span>Previous
            </Button>
            {/* <button onClick={handlenext}>Next</button> */}
            <Button onClick={handlenext}>
              Next<span>👉</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

function StepMessage({ children }) {
  return (
    <div className="message">
      <h3>Step</h3> {children}
    </div>
  );
}

function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
