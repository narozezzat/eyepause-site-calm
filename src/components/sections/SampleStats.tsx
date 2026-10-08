"use client";
import { useState, type CSSProperties } from "react";

export function SampleStats() {
  const [period, setPeriod] = useState("Week");
  const week = period === "Week";
  const values = week ? [6, 8, 5, 7, 8, 4, 0] : [1, 2, 1, 2, 2, 0, 0];
  const labels = week
    ? ["M", "T", "W", "T", "F", "S", "S"]
    : ["09", "10", "11", "12", "13", "14", "15"];
  return (
    <div className="stats">
      <div className="stats-top">
        <strong>Your breaks</strong>
        <div
          className="segment"
          role="group"
          aria-label="Sample statistics period"
        >
          {["Day", "Week"].map((value) => (
            <button
              key={value}
              className={period === value ? "selected" : ""}
              aria-pressed={period === value}
              onClick={() => setPeriod(value)}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div className="stats-total" aria-live="polite">
        <strong>{week ? 38 : 8}</strong>
        <span>breaks {week ? "this week" : "today"}</span>
      </div>
      <div
        role="img"
        aria-label={`Sample ${period.toLowerCase()} statistics: ${values.join(", ")} breaks`}
      >
        <div className="chart">
          {values.map((value, i) => (
            <div
              key={i}
              className={`bar-col${i === 4 ? " today" : ""}`}
              style={
                {
                  "--h": `${Math.max(2, value * (week ? 10 : 35))}%`,
                  "--value": `"${value}"`,
                } as CSSProperties
              }
            >
              <i />
            </div>
          ))}
        </div>
        <div className="chart-labels">
          {labels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      </div>
      <div className="stats-foot">
        <span>A little rest adds up.</span>
        <span>{week ? "12m 40s" : "2m 40s"}</span>
      </div>
    </div>
  );
}
