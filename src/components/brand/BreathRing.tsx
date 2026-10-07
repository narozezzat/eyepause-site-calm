import styles from "./BreathRing.module.css";

interface BreathRingProps {
  label: string;
  /** "splash" draws once; "loop" keeps breathing (route loading state). */
  mode: "splash" | "loop";
}

/** The ring that fills like a breath, shared by the first-paint splash and the loading state. */
export function BreathRing({ label, mode }: BreathRingProps) {
  return (
    <div className={styles.ring} data-mode={mode}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        strokeWidth="3"
        strokeLinecap="round"
        aria-hidden="true"
        focusable="false"
      >
        <circle className={styles.track} cx="50" cy="50" r="42" />
        <circle
          className={styles.progress}
          cx="50"
          cy="50"
          r="42"
          transform="rotate(-90 50 50)"
        />
      </svg>
      <p>{label}</p>
    </div>
  );
}
