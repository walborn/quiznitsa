import { useMemo } from "react";

const COLORS = ["#ff5c5c", "#ffd93d", "#6bcB77", "#4d96ff", "#c34bff", "#ff8c42"];
const PIECE_COUNT = 80;

/**
 * A one-shot confetti burst. Mount it (e.g. via a changing `key`) to fire.
 * Pieces are plain divs animated with CSS keyframes — no dependency.
 */
export function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: PIECE_COUNT }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 0.3,
        duration: 1.8 + Math.random() * 1.2,
        drift: (Math.random() - 0.5) * 200,
        rotate: Math.random() * 720 - 360,
        size: 6 + Math.random() * 8,
      })),
    [],
  );

  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={
            {
              left: `${p.left}%`,
              backgroundColor: p.color,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              "--drift": `${p.drift}px`,
              "--rotate": `${p.rotate}deg`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
