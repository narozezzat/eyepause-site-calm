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
    <section
      className="grid gap-6 border-t border-border py-16 sm:py-20 md:grid-cols-3 md:gap-10 lg:py-28"
      aria-label="Highlights"
    >
      {facts.map((f) => (
        <div key={f.title}>
          <h3 className="mb-1.5 font-display text-xl leading-tight">{f.title}</h3>
          <p className="text-body-sm text-fg-muted">{f.body}</p>
        </div>
      ))}
    </section>
  );
}
