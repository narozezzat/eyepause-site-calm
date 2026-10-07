import styles from "./Facts.module.css";

const facts = [
  {
    title: "Pauses itself",
    body: "Idle, locked, asleep or on a call: the timer waits and picks up where it was.",
  },
  {
    title: "Stays out of the way",
    body: "Lives in the menu bar. No Dock icon, close to zero CPU between breaks.",
  },
  {
    title: "Stays on your Mac",
    body: "No network calls. Statistics live in your user folder and export as CSV.",
  },
];

export function Facts() {
  return (
    <section className={styles.facts} aria-label="Highlights">
      {facts.map((f) => (
        <div key={f.title}>
          <h3>{f.title}</h3>
          <p>{f.body}</p>
        </div>
      ))}
    </section>
  );
}
