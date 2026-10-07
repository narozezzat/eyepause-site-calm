import type { ReactNode } from "react";

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
        Drive it from Shortcuts or Raycast: <code className="rounded-md border border-border bg-surface px-1.5 py-0.5 font-mono text-xs leading-relaxed break-all sm:whitespace-nowrap sm:break-normal">
          eyepause://pause?minutes=30
        </code>
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
    <section
      className="scroll-mt-4 border-t border-border py-16 sm:py-20 lg:py-28"
      id="details"
      aria-labelledby="details-title"
    >
      <h2 id="details-title" className="mb-2 font-display text-section font-light tracking-tight">And the quieter details</h2>
      <div className="mt-7 grid md:grid-cols-2 md:gap-x-14">
        {details.map((d) => (
          <div key={d.title} className="border-t border-border py-4.5">
            <h3 className="mb-1 leading-snug font-medium">{d.title}</h3>
            <p className="text-sm text-fg-muted">{d.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
