"use client";
import { useState } from "react";

export function MenuPreview() {
  const [paused, setPaused] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const time = skipped ? "20:00" : "14:32";
  return (
    <div className="popover" aria-label="Interactive EyePause menu bar preview">
      <div className="menubar">
        <span className="menu-active">
          <svg className="icon" aria-hidden="true">
            <use href="#eye" />
          </svg>
          <span className="mono">{time}</span>
        </span>
        <span>⌘</span>
        <span>Tue 10:24</span>
      </div>
      <div className="pop-content">
        <div className="pop-top">
          <strong>EyePause</strong>
          <span role="status">
            {paused
              ? "Timer paused"
              : skipped
                ? "Next break in 20m"
                : "Timer running"}
          </span>
        </div>
        <div className="pop-time">{time}</div>
        <p className="pop-label">until your next break</p>
        <div className="pop-actions">
          <button onClick={() => setPaused(!paused)}>
            <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{" "}
            {paused ? "Resume" : "Pause"}
          </button>
          <button
            onClick={() => {
              setSkipped(true);
              setPaused(false);
            }}
          >
            Skip this break
          </button>
        </div>
      </div>
    </div>
  );
}
