import { Check } from "lucide-react";

export function QuieterDetails() {
  return (
    <div className="privacy-band">
      <p>Your eyes. Your Mac. Your business.</p>
      <div className="privacy-facts">
        <span>
          <Check aria-hidden="true" className="icon" />
          100% local
        </span>
        <span>
          <Check aria-hidden="true" className="icon" />
          No account
        </span>
        <span>
          <Check aria-hidden="true" className="icon" />
          No telemetry
        </span>
      </div>
    </div>
  );
}
