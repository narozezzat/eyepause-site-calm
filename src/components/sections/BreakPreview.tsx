"use client";
import { useEffect, useState } from "react";
import { remainingSeconds } from "@/lib/demo";

export function BreakPreview() {
  const [deadline, setDeadline] = useState<number | null>(null);
  const [left, setLeft] = useState(20);
  useEffect(() => {
    if (deadline === null) return;
    const id = setInterval(() => {
      const next = remainingSeconds(deadline, Date.now());
      setLeft(next);
      if (next === 0) setDeadline(null);
    }, 200);
    return () => clearInterval(id);
  }, [deadline]);
  const digits = String(left).padStart(2, "0");
  return (
    <div className="break-stage">
      <div className="stage-top">
        <div className="stage-brand">
          <svg className="icon" aria-hidden="true">
            <use href="#eye" />
          </svg>
          EyePause
        </div>
        <span>Full-screen break preview</span>
      </div>
      <div className="break-center">
        <h3>There’s more to see out there.</h3>
        <div
          className="flip-clock"
          role="timer"
          aria-label={`${left} seconds remaining`}
          aria-live="off"
        >
          <span className="flip">{digits[0]}</span>
          <span className="flip">{digits[1]}</span>
        </div>
        <p>Look 20 feet away, for 20 seconds.</p>
      </div>
      <div className="stage-bottom">
        <span aria-live="polite">
          {left === 0
            ? "Rest complete. Welcome back."
            : "A short rest. Then back to it."}
        </span>
        <button
          className="preview-btn"
          onClick={() => {
            setLeft(20);
            setDeadline(deadline === null ? Date.now() + 20000 : null);
          }}
        >
          {deadline !== null
            ? "End preview"
            : left === 0
              ? "Rest complete · Try again"
              : "Try a 20-second pause ↗"}
        </button>
      </div>
    </div>
  );
}
