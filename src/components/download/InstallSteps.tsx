interface InstallStepsProps {
  steps: string[];
}

/** Numbered install steps; the numbers sit on the reading edge in the accent mono. */
export function InstallSteps({ steps }: InstallStepsProps) {
  if (steps.length === 0) return null;
  return (
    <ol className="grid gap-3" aria-label="Install steps">
      {steps.map((step, i) => (
        <li key={step} className="grid grid-cols-[2rem_minmax(0,1fr)] items-baseline text-body-sm text-fg-muted">
          <span className="font-mono text-caption font-medium text-accent-text tabular-nums" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="text-pretty">{step}</span>
        </li>
      ))}
    </ol>
  );
}
