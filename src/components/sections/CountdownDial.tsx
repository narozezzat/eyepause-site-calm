"use client";

import { useDemoCountdown } from "@/hooks/useDemoCountdown";
import styles from "./Hero.module.css";

const CYCLE = 20 * 60;
const START = 19 * 60 + 42;
const CIRCUMFERENCE = 490.1;

const round = (n: number) => Math.round(n * 100) / 100;

const ticks = Array.from({ length: 60 }, (_, i) => {
  const angle = (i * 6 * Math.PI) / 180;
  const major = i % 5 === 0;
  const r1 = major ? 87 : 90;
  const r2 = 94;
  return {
    x1: round(100 + r1 * Math.sin(angle)),
    y1: round(100 - r1 * Math.cos(angle)),
    x2: round(100 + r2 * Math.sin(angle)),
    y2: round(100 - r2 * Math.cos(angle)),
    width: major ? 1.5 : 1,
  };
});

const pad = (n: number) => String(n).padStart(2, "0");

/** Decorative example of the menu bar countdown; the readout is not announced every second. */
export function CountdownDial() {
  const left = useDemoCountdown(START, CYCLE);
  const offset = round(CIRCUMFERENCE * (1 - left / CYCLE));

  return (
    <div
      className={styles.dial}
      role="img"
      aria-label="Example countdown: next break in 19 minutes 42 seconds"
    >
      <svg viewBox="0 0 200 200" fill="none" strokeLinecap="round" aria-hidden="true">
        <g className={styles.ticks}>
          {ticks.map((t, i) => (
            <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} strokeWidth={t.width} />
          ))}
        </g>
        <circle className={styles.track} cx="100" cy="100" r="78" strokeWidth="2" />
        <circle
          className={styles.progress}
          cx="100"
          cy="100"
          r="78"
          strokeWidth="2.5"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          transform="rotate(-90 100 100)"
        />
      </svg>
      <div className={styles.readout} aria-hidden="true">
        <b>
          {pad(Math.floor(left / 60))}:{pad(left % 60)}
        </b>
        <span>until next break</span>
      </div>
    </div>
  );
}
