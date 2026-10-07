"use client";

import { useDemoCountdown } from "@/hooks/useDemoCountdown";
import styles from "./DayTour.module.css";

/** The overlay mock's flip clock, counting a 20 second break. */
export function FlipClockDemo() {
  const left = useDemoCountdown(20, 20);
  return (
    <div className={styles.flip} aria-hidden="true">
      <span>0</span>
      <span>0</span>
      <i>:</i>
      <span>{Math.floor(left / 10)}</span>
      <span>{left % 10}</span>
    </div>
  );
}
