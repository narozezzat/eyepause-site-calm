"use client";

import { useDemoCountdown } from "@/hooks/useDemoCountdown";

/** The overlay mock's flip clock, counting a 20 second break. */
export function FlipClockDemo() {
  const left = useDemoCountdown(20, 20);
  return (
    <div className="mt-5 mb-4.5 flex justify-center gap-1.5" aria-hidden="true">
      <Digit value={0} />
      <Digit value={0} />
      <i className="self-center font-mono text-title font-medium text-ov-fg-subtle not-italic">:</i>
      <Digit value={Math.floor(left / 10)} />
      <Digit value={left % 10} />
    </div>
  );
}

/** One flip tile; the hairline across the middle is the hinge. */
function Digit({ value }: { value: number }) {
  return (
    <span className="relative grid h-16 w-12 place-items-center rounded-control bg-ov-tile font-mono text-section font-medium tabular-nums after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-ov-bg sm:h-18 sm:w-14">
      {value}
    </span>
  );
}
