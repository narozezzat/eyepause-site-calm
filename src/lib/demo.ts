/** Wall-clock countdown: background tabs cannot stretch a twenty-second break. */
export function remainingSeconds(deadline: number, now: number): number {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}

/** Seconds as the app's menu bar shows them, e.g. 872 -> "14:32". */
export function formatClock(seconds: number): string {
  const s = Math.max(0, Math.round(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

/** Share of the cycle still to run, clamped to 0...1, so rings and bars follow the timer. */
export function cycleFraction(left: number, cycle: number): number {
  return Math.min(1, Math.max(0, left / cycle));
}
