import { BreathRing } from "./BreathRing";
import styles from "./Splash.module.css";

/**
 * First-paint "Breathe in" ring. Pure CSS so it needs no JavaScript, never
 * intercepts input, and is skipped entirely under reduced motion.
 */
export function Splash() {
  return (
    <div className={styles.splash} aria-hidden="true">
      <BreathRing label="Breathe in" mode="splash" />
    </div>
  );
}
