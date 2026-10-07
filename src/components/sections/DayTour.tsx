import { cn } from "@/lib/cn";
import { FlipClockDemo } from "./FlipClockDemo";

const moment =
  "grid items-start gap-3.5 border-t border-border py-9 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-x-8 lg:grid-cols-[110px_minmax(0,0.8fr)_minmax(0,1.1fr)]";
const time =
  "font-mono text-sm leading-normal font-medium text-accent-text tabular-nums md:col-span-2 lg:col-span-1";
const title = "mb-2.5 font-display text-2xl leading-tight tracking-tight";
const body = "text-body-sm text-fg-muted";
const list =
  "mt-3.5 grid gap-1.5 text-sm text-fg-muted [&>li]:before:mr-2 [&>li]:before:text-fg-subtle [&>li]:before:content-['—']";
const mock = "rounded-2xl border border-border bg-surface p-4 text-caption sm:p-5";
const cap = "font-mono text-2xs leading-none font-medium tracking-caps uppercase";

const presets = [
  { name: "20-20-20", detail: "20m · 20s · 5m", selected: true },
  { name: "Pomodoro", detail: "25m · 5m · 15m", selected: false },
  { name: "Deep work", detail: "50m · 10m · 20m", selected: false },
];

const states = [
  { name: "Idle", detail: "No input for 5 minutes", result: "Paused" },
  { name: "Locked", detail: "Screen locked or Mac asleep", result: "Paused" },
  { name: "On a call", detail: "Microphone or camera in use", result: "Waiting" },
  { name: "Full screen", detail: "Keynote is in front", result: "Up to 10 min" },
  { name: "Off hours", detail: "Outside Mon–Fri, 9:00–18:00", result: "Off" },
];

/** Completion per day, 0–100. Today is Sunday. */
const week = [85, 92, 78, 95, 88, 60, 90];
const weekLabels = ["M", "T", "W", "T", "F", "S", "S"];
const GOAL = 80;

export function DayTour() {
  return (
    <section
      className="scroll-mt-4 border-t border-border pt-16 pb-6 sm:pt-20 lg:pt-28"
      id="tour"
      aria-labelledby="tour-title"
    >
      <h2 id="tour-title" className="mb-2 font-display text-section font-light tracking-tight">A day with EyePause</h2>
      <p className="mb-10 max-w-[52ch] text-fg-muted">
        What it actually does between nine and six. Every screen below is drawn
        from the app.
      </p>

      <article className={moment} aria-labelledby="m-start">
        <time className={time} dateTime="09:00">09:00</time>
        <div>
          <h3 id="m-start" className={title}>Start a session</h3>
          <p className={body}>
            Click the eye in your menu bar. Pick a rhythm or set your own work
            interval (5–60 min) and break length.
          </p>
          <ul className={list}>
            <li>
              Optional countdown beside the icon: <b>18m</b> or <b>17:42</b>
            </li>
            <li>Pause for 15 min, 30 min, an hour or until tomorrow</li>
          </ul>
        </div>
        <div
          className={mock}
          role="img"
          aria-label="EyePause popover with schedule presets"
        >
          <div className="flex items-center justify-between gap-3">
            <span className={cn(cap, "text-fg-subtle")}>EyePause</span>
            <span className="rounded-full border border-border bg-bg px-2 py-1.25 font-mono text-2xs leading-none font-medium text-fg-muted">
              Ready to Focus
            </span>
          </div>
          <div className="my-4 grid gap-1.5">
            {presets.map((p) => (
              <div
                key={p.name}
                className={cn(
                  "flex justify-between gap-3 rounded-lg border px-3 py-2.25",
                  p.selected ? "border-accent text-fg" : "border-border text-fg-muted",
                )}
              >
                {p.name} <span className="font-mono text-xs">{p.detail}</span>
              </div>
            ))}
          </div>
          <span className="block rounded-lg bg-fg p-2.75 text-center font-semibold text-bg">
            Start Session
          </span>
        </div>
      </article>

      <article className={moment} aria-labelledby="m-headsup">
        <time className={time} dateTime="10:59">10:59</time>
        <div>
          <h3 id="m-headsup" className={title}>A heads-up, before it interrupts</h3>
          <p className={body}>
            A small toast slides in under the menu bar. Finish your sentence, or
            push the break back five minutes.
          </p>
        </div>
        <div>
          <div
            className="flex max-w-90 flex-wrap items-center gap-x-3.5 gap-y-2 rounded-xl border border-border bg-surface px-3.5 py-3 text-caption shadow-toast md:ml-auto"
            role="img"
            aria-label="Heads-up toast: break in 30 seconds, postpone 5 minutes"
          >
            <svg
              className="size-8.5 flex-none fill-none stroke-3"
              viewBox="0 0 36 36"
              aria-hidden="true"
            >
              <circle className="stroke-surface-2" cx="18" cy="18" r="15" />
              <circle
                className="stroke-accent"
                cx="18"
                cy="18"
                r="15"
                strokeDasharray="94.2"
                strokeDashoffset="47"
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <div className="min-w-0">
              <b className="block text-sm">Break in 30s</b>
              <span className="text-xs text-fg-subtle">Micro break · 20 sec</span>
            </div>
            <span className="ml-auto rounded-lg border border-border px-2.5 py-1.75 text-xs font-semibold whitespace-nowrap text-fg">
              Postpone 5 min
            </span>
          </div>
        </div>
      </article>

      <article className={moment} aria-labelledby="m-break">
        <time className={time} dateTime="11:00">11:00</time>
        <div>
          <h3 id="m-break" className={title}>Twenty seconds, twenty feet</h3>
          <p className={body}>
            A floating card, or a full-screen overlay across every display. Flip
            clock or circular timer. Skip twice in a row and the next one goes
            full screen.
          </p>
          <ul className={list}>
            <li>Guided eye exercises: focus shifts, figure-eight, palming</li>
            <li>Strict mode: delay or hide Skip, triple-Esc to escape</li>
          </ul>
        </div>
        <div
          className="rounded-2xl border border-border bg-ov-bg px-4 pt-8.5 pb-6 text-center text-ov-fg sm:px-6"
          role="img"
          aria-label="Break overlay with flip clock showing 20 seconds"
        >
          <span className={cn(cap, "text-ov-fg-subtle")}>Micro break</span>
          <FlipClockDemo />
          <h4 className="mb-1.5 font-display text-2xl leading-tight">Look away from your screen</h4>
          <p className="mb-5 text-sm text-ov-fg-muted">Focus on an object at least 20 feet (6m) away.</p>
          <div className="flex flex-wrap justify-center gap-2 text-caption">
            <span className="rounded-lg bg-ov-tile px-3.5 py-2 text-ov-button">Skip</span>
            <span className="rounded-lg bg-ov-tile px-3.5 py-2 text-ov-button">Snooze</span>
            <span className="rounded-lg bg-ov-accent px-3.5 py-2 font-semibold text-ov-accent-fg">
              I&apos;m Done
            </span>
          </div>
        </div>
      </article>

      <article className={moment} aria-labelledby="m-lunch">
        <time className={time} dateTime="12:40">12:40</time>
        <div>
          <h3 id="m-lunch" className={title}>Lunch. It notices.</h3>
          <p className={body}>
            The timer pauses when you walk away and picks up when you&apos;re
            back. A break that&apos;s due waits while you&apos;re presenting or
            on a call. No Accessibility permission needed.
          </p>
        </div>
        <div
          className={cn(mock, "grid gap-2")}
          role="img"
          aria-label="Timer states: idle, locked, on a call, full screen, outside work hours"
        >
          {states.map((s) => (
            <div
              key={s.name}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-2 gap-y-1 rounded-lg border border-border px-3 py-2.5 sm:grid-cols-[6rem_minmax(0,1fr)_auto] sm:gap-x-3"
            >
              <b className="font-mono text-xs leading-none font-medium">{s.name}</b>
              <span className="col-span-2 text-fg-muted sm:col-span-1">{s.detail}</span>
              <em className="col-start-2 row-start-1 font-mono text-2xs leading-none font-medium text-fg-subtle not-italic sm:col-start-auto sm:row-start-auto">
                {s.result}
              </em>
            </div>
          ))}
        </div>
      </article>

      <article className={moment} aria-labelledby="m-stats">
        <time className={time} dateTime="18:00">18:00</time>
        <div>
          <h3 id="m-stats" className={title}>See how the day went</h3>
          <p className={body}>
            Completed, skipped and snoozed breaks, screen time, longest session
            and a daily goal you choose. History goes back a year, with a
            heatmap and your best hours.
          </p>
          <ul className={list}>
            <li>Export everything as CSV or JSON</li>
            <li>Optional weekly summary notification</li>
          </ul>
        </div>
        <div
          className={mock}
          role="img"
          aria-label="Statistics: 90 percent completion, 18 breaks completed, 2 skipped, 6 hours 40 minutes screen time, weekly chart"
        >
          <div className="grid items-center justify-items-start gap-5.5 sm:grid-cols-[auto_1fr] sm:justify-items-stretch">
            <div className="relative size-28">
              <svg className="size-full" viewBox="0 0 100 100" fill="none" aria-hidden="true">
                <circle className="stroke-surface-2" cx="50" cy="50" r="42" strokeWidth="7" />
                <circle
                  className="stroke-accent"
                  cx="50"
                  cy="50"
                  r="42"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray="263.9"
                  strokeDashoffset="26.4"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <b className="absolute inset-0 grid place-items-center font-display text-3xl leading-none font-light">
                90%
              </b>
            </div>
            <div className="grid grid-cols-2 gap-x-4.5 gap-y-3 [&_b]:block [&_b]:font-mono [&_b]:text-lg [&_b]:leading-tight [&_b]:font-medium [&_b]:tabular-nums [&_span]:text-xs [&_span]:text-fg-subtle">
              <div>
                <b>18</b>
                <span>Breaks Completed</span>
              </div>
              <div>
                <b>2</b>
                <span>Breaks Skipped</span>
              </div>
              <div>
                <b>6h 40m</b>
                <span>Screen Time</span>
              </div>
              <div>
                <b>12 days</b>
                <span>Current Streak</span>
              </div>
            </div>
          </div>
          <div className="mt-5 border-t border-border pt-4">
            <span className={cn(cap, "text-fg-subtle")}>Breaks this week · goal {GOAL}%</span>
            <div className="relative [--bars-h:86px]">
              <div className="mt-2.5 grid h-(--bars-h) grid-cols-7 items-end gap-2">
                {week.map((value, i) => (
                  <div
                    key={i}
                    className={cn("rounded-t-sm", i === week.length - 1 ? "bg-accent" : "bg-surface-2")}
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
              <div
                className="absolute inset-x-0 border-t border-dashed border-fg-subtle opacity-60"
                style={{ bottom: `calc(var(--bars-h) * ${GOAL / 100})` }}
              >
                <span className="absolute -top-4 right-0 font-mono text-2xs leading-none font-medium text-fg-subtle">
                  {GOAL}%
                </span>
              </div>
            </div>
            <div className="mt-1.5 grid grid-cols-7 gap-2 text-center font-mono text-2xs leading-none font-medium text-fg-subtle">
              {weekLabels.map((label, i) => (
                <span key={i}>{label}</span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
