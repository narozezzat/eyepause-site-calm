import { BreathRing } from "@/components/brand/BreathRing";
import styles from "./status.module.css";

export default function Loading() {
  return (
    <div className={styles.loading} role="status">
      <BreathRing label="Loading EyePause" mode="loop" />
    </div>
  );
}
