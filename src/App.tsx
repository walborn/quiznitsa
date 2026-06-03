import { useState } from "react";
import { questions } from "./quiz-data";
import { QuestionCard } from "./QuestionCard";
import { Confetti } from "./Confetti";
import "./App.css";

function App() {
  const [index, setIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const isLast = index === questions.length - 1;

  function handleAnswered(correct: boolean) {
    setAnswered(true);
    setLastCorrect(correct);
    if (correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
      return;
    }
    setIndex((i) => i + 1);
    setAnswered(false);
    setLastCorrect(false);
  }

  function handleRestart() {
    setIndex(0);
    setAnswered(false);
    setLastCorrect(false);
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <main className="container">
        <div className="results">
          <h1>Quiz complete!</h1>
          <p className="score">
            You got {score} / {questions.length}
          </p>
          <button type="button" className="check-button" onClick={handleRestart}>
            Play again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      {answered && lastCorrect && <Confetti key={index} />}

      <p className="progress">
        Question {index + 1} of {questions.length}
      </p>

      <QuestionCard
        key={index}
        question={questions[index]}
        onAnswered={handleAnswered}
      />

      {answered && (
        <button type="button" className="next-button" onClick={handleNext}>
          {isLast ? "See results" : "Next"}
        </button>
      )}
    </main>
  );
}

export default App;
