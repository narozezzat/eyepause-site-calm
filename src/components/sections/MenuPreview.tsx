"use client";
import { heroTimer, useDemoTimer } from "@/hooks/useDemoTimer";
import { formatClock } from "@/lib/demo";

export function MenuPreview() {
  const { left, paused, skipped } = useDemoTimer(heroTimer);
  const time = formatClock(left);
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
        <div className="pop-time" data-paused={paused || undefined}>
          {time}
        </div>
        <p className="pop-label">until your next break</p>
        <div className="pop-actions">
          <button onClick={heroTimer.togglePause}>
            <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>{" "}
            {paused ? "Resume" : "Pause"}
          </button>
          <button onClick={heroTimer.skip}>Skip this break</button>
        </div>
      </div>
    </div>
  );
}
