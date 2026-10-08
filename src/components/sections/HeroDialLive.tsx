"use client";

import { heroTimer, useDemoTimer } from "@/hooks/useDemoTimer";
import { cycleFraction, formatClock } from "@/lib/demo";

const RADIUS = 143;
const CENTER = 210;
/** 2π × 143, rounded as the dial track is drawn. */
const CIRCUMFERENCE = 899;

/** The accent arc and its end dot, draining with the shared hero timer. */
export function DialProgress() {
  const { left } = useDemoTimer(heroTimer);
  const share = cycleFraction(left, heroTimer.cycle);
  const angle = share * 2 * Math.PI;
  return (
    <>
      <circle
        cx={CENTER}
        cy={CENTER}
        r={RADIUS}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeDasharray={`${Math.round(share * CIRCUMFERENCE)} ${CIRCUMFERENCE}`}
        transform={`rotate(-90 ${CENTER} ${CENTER})`}
      />
      <circle
        className="dial-dot"
        cx={(CENTER + RADIUS * Math.sin(angle)).toFixed(1)}
        cy={(CENTER - RADIUS * Math.cos(angle)).toFixed(1)}
        r="5"
        fill="var(--accent-text)"
      />
    </>
  );
}

export function DialTime() {
  const { left } = useDemoTimer(heroTimer);
  return <span className="time">{formatClock(left)}</span>;
}
