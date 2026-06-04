import { useState } from "react";
import type { Question } from "./quiz-data";

interface QuestionCardProps {
  question: Question;
  /** Called once when the user checks their answer. */
  onAnswered: (correct: boolean) => void;
}

/**
 * Renders a single question: image, prompt, selectable options, and the
 * "Check" button. Owns selection state for this question only; on check it
 * locks the options, shows ✅/❌ markers, and reports correctness upward.
 */
export function QuestionCard({ question, onAnswered }: QuestionCardProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);

  function toggle(index: number) {
    if (checked) return;
    setSelected((prev) => {
      if (question.type === "single") return new Set([index]);
      const next = new Set(prev);
      next.has(index) ? next.delete(index) : next.add(index);
      return next;
    });
  }

  function handleCheck() {
    const correct = question.options.every(
      (opt, i) => opt.correct === selected.has(i),
    );
    setChecked(true);
    onAnswered(correct);
  }

  const showAnswerVideo = Boolean(checked && question.answerVideo);
  const videoSrc = showAnswerVideo
    ? question.answerVideo
    : question.video;

  return (
    <div className="card">
      <video
        className="question-video"
        src={import.meta.env.BASE_URL + videoSrc}
        autoPlay={showAnswerVideo}
        muted={showAnswerVideo && question.muteAnswerVideo}
        loop
        playsInline
        controls
      />
      <h2 className="prompt">{question.prompt}</h2>

      <ul className="options">
        {question.options.map((opt, i) => {
          const isSelected = selected.has(i);
          const showCheck = checked && opt.correct;
          const showCross = checked && isSelected && !opt.correct;
          const className = [
            "option",
            isSelected ? "selected" : "",
            showCheck ? "correct" : "",
            showCross ? "wrong" : "",
            checked ? "locked" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <li key={i}>
              <button
                type="button"
                className={className}
                onClick={() => toggle(i)}
                disabled={checked}
              >
                <span className="option-text">{opt.text}</span>
                {showCheck && <span className="marker check">✓</span>}
                {showCross && <span className="marker cross">✕</span>}
              </button>
            </li>
          );
        })}
      </ul>

      {/* {checked && question.answerVideo && (
        <div className="answer">
          <p className="answer-label">Ответ</p>
          <video
            className="question-video"
            src={import.meta.env.BASE_URL + question.answerVideo}
            autoPlay
            playsInline
            controls
          />
        </div>
      )} */}

      {!checked && (
        <button
          type="button"
          className="check-button"
          onClick={handleCheck}
          disabled={selected.size === 0}
        >
          Check
        </button>
      )}
    </div>
  );
}
