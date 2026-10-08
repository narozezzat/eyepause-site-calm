import { cn } from "@/lib/cn";

interface BreathRingProps {
  label: string;
  /** "splash" draws once; "loop" keeps breathing (route loading state). */
  mode: "splash" | "loop";
}

/** The ring that fills like a breath, shared by the first-paint splash and the loading state. */
export function BreathRing({ label, mode }: BreathRingProps) {
  return (
    <div data-mode={mode}>
      <svg
        className="mx-auto block size-22"
        viewBox="0 0 100 100"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle className="stroke-surface-2" cx="50" cy="50" r="42" />
        <circle
          className={cn(
            "stroke-accent [stroke-dasharray:264] [stroke-dashoffset:264] motion-reduce:animate-none motion-reduce:[stroke-dashoffset:0]",
            mode === "loop" ? "animate-breathe" : "animate-draw",
          )}
          cx="50"
          cy="50"
          r="42"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <p className="mt-4 text-center font-mono text-micro font-medium tracking-caps text-fg-subtle uppercase">
        {label}
      </p>
    </div>
  );
}
