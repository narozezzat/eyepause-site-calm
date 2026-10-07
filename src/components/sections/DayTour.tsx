import { FlipClockDemo } from "./FlipClockDemo";
import styles from "./DayTour.module.css";

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
    <section className={styles.day} id="tour" aria-labelledby="tour-title">
      <h2 id="tour-title">A day with EyePause</h2>
      <p className={styles.intro}>
        What it actually does between nine and six. Every screen below is drawn
        from the app.
      </p>

      <article className={styles.moment} aria-labelledby="m-start">
        <time dateTime="09:00">09:00</time>
        <div>
          <h3 id="m-start">Start a session</h3>
          <p>
            Click the eye in your menu bar. Pick a rhythm or set your own work
            interval (5–60 min) and break length.
          </p>
          <ul>
            <li>
              Optional countdown beside the icon: <b>18m</b> or <b>17:42</b>
            </li>
            <li>Pause for 15 min, 30 min, an hour or until tomorrow</li>
          </ul>
        </div>
        <div
          className={styles.mock}
          role="img"
          aria-label="EyePause popover with schedule presets"
        >
          <div className={styles.popHead}>
            <span className={styles.cap}>EyePause</span>
            <span className={styles.pill}>Ready to Focus</span>
          </div>
          <div className={styles.presets}>
            {presets.map((p) => (
              <div key={p.name} className={p.selected ? styles.selected : undefined}>
                {p.name} <span>{p.detail}</span>
              </div>
            ))}
          </div>
          <span className={styles.mockButton}>Start Session</span>
        </div>
      </article>

      <article className={styles.moment} aria-labelledby="m-headsup">
        <time dateTime="10:59">10:59</time>
        <div>
          <h3 id="m-headsup">A heads-up, before it interrupts</h3>
          <p>
            A small toast slides in under the menu bar. Finish your sentence, or
            push the break back five minutes.
          </p>
        </div>
        <div>
          <div
            className={styles.toast}
            role="img"
            aria-label="Heads-up toast: break in 30 seconds, postpone 5 minutes"
          >
            <svg className={styles.mini} viewBox="0 0 36 36" aria-hidden="true">
              <circle cx="18" cy="18" r="15" stroke="var(--ring-track)" />
              <circle
                cx="18"
                cy="18"
                r="15"
                stroke="var(--accent)"
                strokeDasharray="94.2"
                strokeDashoffset="47"
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <div>
              <b>Break in 30s</b>
              <span>Micro break · 20 sec</span>
            </div>
            <span className={styles.toastButton}>Postpone 5 min</span>
          </div>
        </div>
      </article>

      <article className={styles.moment} aria-labelledby="m-break">
        <time dateTime="11:00">11:00</time>
        <div>
          <h3 id="m-break">Twenty seconds, twenty feet</h3>
          <p>
            A floating card, or a full-screen overlay across every display. Flip
            clock or circular timer. Skip twice in a row and the next one goes
            full screen.
          </p>
          <ul>
            <li>Guided eye exercises: focus shifts, figure-eight, palming</li>
            <li>Strict mode: delay or hide Skip, triple-Esc to escape</li>
          </ul>
        </div>
        <div
          className={styles.overlay}
          role="img"
          aria-label="Break overlay with flip clock showing 20 seconds"
        >
          <span className={styles.cap}>Micro break</span>
          <FlipClockDemo />
          <h4>Look away from your screen</h4>
          <p>Focus on an object at least 20 feet (6m) away.</p>
          <div className={styles.overlayActions}>
            <span>Skip</span>
            <span>Snooze</span>
            <span className={styles.done}>I&apos;m Done</span>
          </div>
        </div>
      </article>

      <article className={styles.moment} aria-labelledby="m-lunch">
        <time dateTime="12:40">12:40</time>
        <div>
          <h3 id="m-lunch">Lunch. It notices.</h3>
          <p>
            The timer pauses when you walk away and picks up when you&apos;re
            back. A break that&apos;s due waits while you&apos;re presenting or
            on a call. No Accessibility permission needed.
          </p>
        </div>
        <div
          className={`${styles.mock} ${styles.states}`}
          role="img"
          aria-label="Timer states: idle, locked, on a call, full screen, outside work hours"
        >
          {states.map((s) => (
            <div key={s.name} className={styles.state}>
              <b>{s.name}</b>
              <span>{s.detail}</span>
              <em>{s.result}</em>
            </div>
          ))}
        </div>
      </article>

      <article className={styles.moment} aria-labelledby="m-stats">
        <time dateTime="18:00">18:00</time>
        <div>
          <h3 id="m-stats">See how the day went</h3>
          <p>
            Completed, skipped and snoozed breaks, screen time, longest session
            and a daily goal you choose. History goes back a year, with a
            heatmap and your best hours.
          </p>
          <ul>
            <li>Export everything as CSV or JSON</li>
            <li>Optional weekly summary notification</li>
          </ul>
        </div>
        <div
          className={styles.mock}
          role="img"
          aria-label="Statistics: 90 percent completion, 18 breaks completed, 2 skipped, 6 hours 40 minutes screen time, weekly chart"
        >
          <div className={styles.statsMock}>
            <div className={styles.completion}>
              <svg viewBox="0 0 100 100" fill="none" aria-hidden="true">
                <circle cx="50" cy="50" r="42" stroke="var(--ring-track)" strokeWidth="7" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  stroke="var(--accent)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray="263.9"
                  strokeDashoffset="26.4"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <b>90%</b>
            </div>
            <div className={styles.kv}>
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
          <div className={styles.week}>
            <span className={styles.cap}>Breaks this week · goal {GOAL}%</span>
            <div className={styles.goal}>
              <div className={styles.bars}>
                {week.map((value, i) => (
                  <div
                    key={i}
                    className={i === week.length - 1 ? styles.today : undefined}
                    style={{ height: `${value}%` }}
                  />
                ))}
              </div>
              <div className={styles.goalLine} style={{ bottom: `calc(var(--bars-h) * ${GOAL / 100})` }}>
                <span>{GOAL}%</span>
              </div>
            </div>
            <div className={styles.barLabels}>
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
