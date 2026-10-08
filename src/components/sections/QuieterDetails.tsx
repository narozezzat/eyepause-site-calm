export function QuieterDetails() {
  return (
    <div className="privacy-band">
      <p>Your eyes. Your Mac. Your business.</p>
      <div className="privacy-facts">
        <span>
          <svg aria-hidden="true" className="icon">
            <use href="#check" />
          </svg>
          100% local
        </span>
        <span>
          <svg aria-hidden="true" className="icon">
            <use href="#check" />
          </svg>
          No account
        </span>
        <span>
          <svg aria-hidden="true" className="icon">
            <use href="#check" />
          </svg>
          No telemetry
        </span>
      </div>
    </div>
  );
}
