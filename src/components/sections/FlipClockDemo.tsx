"use client";

import { useDemoCountdown } from "@/hooks/useDemoCountdown";

/** The overlay mock's flip clock, counting a 20 second break. */
export function FlipClockDemo() {
  const left = useDemoCountdown(20, 20);
  return (
    <div className="mt-5 mb-4.5 flex justify-center gap-1.5" aria-hidden="true">
      <Digit value={0} />
      <Digit value={0} />
      <i className="self-center font-mono text-3xl leading-none font-medium text-ov-colon not-italic">:</i>
      <Digit value={Math.floor(left / 10)} />
      <Digit value={left % 10} />
    </div>
  );
}

/** One flip tile; the hairline across the middle is the hinge. */
function Digit({ value }: { value: number }) {
  return (
    <span className="relative grid h-15.5 w-11.5 place-items-center rounded-lg bg-ov-tile font-mono text-flip font-medium shadow-[inset_0_-1px_0_rgb(255_255_255/0.06)] after:absolute after:inset-x-0 after:top-1/2 after:h-px after:bg-ov-bg sm:h-17.5 sm:w-13.5">
      {value}
    </span>
  );
}
