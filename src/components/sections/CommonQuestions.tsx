export function CommonQuestions() {
  return (
    <section className="faq" aria-label="Common questions">
      <details>
        <summary>What happens when I step away from my Mac?</summary>
        <p>
          EyePause automatically pauses while your Mac is idle, asleep, or
          locked. Your reminders resume when you return.
        </p>
      </details>
      <details>
        <summary>Can I change the timing?</summary>
        <p>
          Yes. Open settings to adjust your break schedule and sounds. You can
          also pause the timer or skip a break from the menu bar.
        </p>
      </details>
      <details>
        <summary>Does anything leave my Mac?</summary>
        <p>
          No. EyePause works locally, with no account and no telemetry. Your
          daily and weekly break statistics stay on your Mac.
        </p>
      </details>
    </section>
  );
}
