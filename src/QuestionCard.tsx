import { useState } from "react";
import type { Question } from "./quiz-data";

interface QuestionCardProps {
  question: Question;
  /** Called once when the user checks their answer. */
  onAnswered: (correct: boolean) => void;
}

/**
 * One question in two phases:
 *  1. The intro video plays full-window; when it ends (or is skipped) we
 *     advance to phase 2.
 *  2. The prompt + selectable options + "Check" button. After checking, the
 *     options lock, ✓/✕ markers show, and an optional answer video plays.
 */
export function QuestionCard({ question, onAnswered }: QuestionCardProps) {
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [checked, setChecked] = useState(false);
  const [introDone, setIntroDone] = useState(false);

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

  // Phase 1: fullscreen intro video.
  if (!introDone) {
    return (
      <div className="video-overlay">
        <video
          className="overlay-video"
          src={import.meta.env.BASE_URL + question.video}
          autoPlay
          playsInline
          controls
          onEnded={() => setIntroDone(true)}
        />
        <button
          type="button"
          className="skip-button"
          onClick={() => setIntroDone(true)}
        >
          Skip ▸
        </button>
      </div>
    );
  }

  // Phase 2: the question.
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
