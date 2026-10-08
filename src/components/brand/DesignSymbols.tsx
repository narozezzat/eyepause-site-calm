export function DesignSymbols() {
  return (
    <svg
      width="0"
      height="0"
      aria-hidden="true"
      style={{ position: "absolute" }}
    >
      <defs>
        <symbol id="eye" viewBox="0 0 24 24">
          <path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </symbol>
        <symbol id="arrow" viewBox="0 0 24 24">
          <path d="M12 3v12m-5-5 5 5 5-5M5 16v5h14v-5" />
        </symbol>
        <symbol id="check" viewBox="0 0 24 24">
          <path d="m5 12 4 4 10-10" />
        </symbol>
        <symbol id="pause" viewBox="0 0 24 24">
          <path d="M8 5v14M16 5v14" />
        </symbol>
        <symbol id="moon" viewBox="0 0 24 24">
          <path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z" />
        </symbol>
        <symbol id="sound" viewBox="0 0 24 24">
          <path d="m11 4-6 5H2v6h3l6 5ZM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" />
        </symbol>
        <symbol id="settings" viewBox="0 0 24 24">
          <path d="M4 7h16M4 17h16" />
          <circle cx="9" cy="7" r="3" fill="var(--bg)" />
          <circle cx="16" cy="17" r="3" fill="var(--bg)" />
        </symbol>
      </defs>
    </svg>
  );
}
