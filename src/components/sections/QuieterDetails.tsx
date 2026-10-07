import type { ReactNode } from "react";
import styles from "./QuieterDetails.module.css";

const details: { title: string; body: ReactNode }[] = [
  { title: "Work hours", body: "Reminders only on the days and hours you choose." },
  {
    title: "Wellness nudges",
    body: "Blink, posture, water and stand-up reminders. All off by default.",
  },
  { title: "Global shortcuts", body: "Record your own keys for Pause, Break Now and Skip." },
  {
    title: "Automation",
    body: (
      <>
        Drive it from Shortcuts or Raycast: <code>eyepause://pause?minutes=30</code>
      </>
    ),
  },
  {
    title: "Chimes",
    body: "Start and end sounds from the bundled set, macOS, or your own file.",
  },
  {
    title: "English and Arabic",
    body: "Follows your Mac's language, right-to-left included.",
  },
];

export function QuieterDetails() {
  return (
    <section className={styles.more} id="details" aria-labelledby="details-title">
      <h2 id="details-title">And the quieter details</h2>
      <div className={styles.grid}>
        {details.map((d) => (
          <div key={d.title}>
            <h3>{d.title}</h3>
            <p>{d.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
