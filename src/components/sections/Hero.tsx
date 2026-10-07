import { CountdownDial } from "./CountdownDial";

export function Hero() {
  return (
    <section
      className="grid items-center gap-9 py-16 sm:py-20 md:grid-cols-[1.1fr_0.9fr] md:gap-14 lg:py-28 [&>*]:min-w-0"
      aria-labelledby="hero-title"
    >
      <div>
        <p className="mb-5.5 font-mono text-xs leading-none font-medium tracking-caps text-fg-subtle uppercase">
          For macOS 14 Sonoma and later
        </p>
        <h1
          id="hero-title"
          className="font-display text-hero font-light tracking-tight text-balance"
        >
          Every twenty minutes, <em className="text-accent italic">look away.</em>
        </h1>
        <p className="mt-6.5 max-w-[46ch] text-lg text-fg-muted">
          EyePause sits in your menu bar and reminds you to rest your eyes with
          the 20-20-20 rule. It pauses when you step away, waits while
          you&apos;re on a call, and keeps every number on your Mac.
        </p>
      </div>
      <CountdownDial />
    </section>
  );
}
