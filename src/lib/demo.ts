/** Wall-clock countdown: background tabs cannot stretch a twenty-second break. */
export function remainingSeconds(deadline: number, now: number): number {
  return Math.max(0, Math.ceil((deadline - now) / 1000));
}
