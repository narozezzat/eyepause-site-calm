import { CountdownDial } from "./CountdownDial";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div>
        <p className={styles.eyebrow}>For macOS 14 Sonoma and later</p>
        <h1 id="hero-title" className={styles.title}>
          Every twenty minutes, <em>look away.</em>
        </h1>
        <p className={styles.lede}>
          EyePause sits in your menu bar and reminds you to rest your eyes with
          the 20-20-20 rule. It pauses when you step away, waits while
          you&apos;re on a call, and keeps every number on your Mac.
        </p>
      </div>
      <CountdownDial />
    </section>
  );
}
