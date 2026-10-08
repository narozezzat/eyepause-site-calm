import { Moon, Settings2, Volume2 } from "lucide-react";
import { BreakPreview } from "./BreakPreview";
import { SampleStats } from "./SampleStats";
export function DayTour() {
  return (
    <>
      <section className="section" id="experience">
        <div className="section-head">
          <h2>A pause, with a purpose.</h2>
          <p>
            When it’s time, give your screen a moment.
            <br />
            Find something in the distance. Let your eyes rest.
          </p>
        </div>
        <BreakPreview />
        <div className="feature-caption">
          <p>
            <strong>A gentle heads-up.</strong> A toast before each break gives
            you time to finish your thought.
          </p>
          <p>
            <strong>A change of focus.</strong> Simple eye exercises add a
            little variety to your rest.
          </p>
        </div>
      </section>
      <section className="everyday" id="details">
        <div>
          <h2>
            Fits your day.
            <br />
            Stays out of the way.
          </h2>
          <p className="muted">
            Made for the small moments
            <br />
            between the things you’re doing.
          </p>
          <div className="feature-list">
            <div className="feature-line">
              <Moon aria-hidden="true" className="icon" />
              <div>
                <h3>Steps back when you do</h3>
                <p>
                  Smart pause on idle, sleep, and lock. Your break schedule
                  follows your day.
                </p>
              </div>
            </div>
            <div className="feature-line">
              <Settings2 aria-hidden="true" className="icon" />
              <div>
                <h3>Your rhythm, your settings</h3>
                <p>
                  Adjust your reminders, pause or skip a break, and launch at
                  login.
                </p>
              </div>
            </div>
            <div className="feature-line">
              <Volume2 aria-hidden="true" className="icon" />
              <div>
                <h3>A sound, or a little silence</h3>
                <p>Choose a sound for your breaks. Or keep things quiet.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="daily-stage">
          <div className="toast">
            <div className="toast-logo">
              <svg aria-hidden="true" className="icon">
                <use href="#eye" />
              </svg>
            </div>
            <div>
              <strong>A little break in 30 seconds</strong>
              <p>Finish your thought. We’ll keep time.</p>
            </div>
          </div>
          <SampleStats />
          <p className="daily-caption">Sample stats. A record, not a score.</p>
        </div>
      </section>
    </>
  );
}
