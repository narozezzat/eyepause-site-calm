import { BreathRing } from "./BreathRing";

/**
 * First-paint "Breathe in" ring. Pure CSS so it needs no JavaScript, never
 * intercepts input, and is skipped entirely under reduced motion.
 */
export function Splash() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 grid animate-splash-out place-items-center bg-bg motion-reduce:hidden"
      aria-hidden="true"
    >
      <BreathRing label="Breathe in" mode="splash" />
    </div>
  );
}
