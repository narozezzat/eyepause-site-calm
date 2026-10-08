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
        <symbol id="pause" viewBox="0 0 24 24">
          <path d="M8 5v14M16 5v14" />
        </symbol>
      </defs>
    </svg>
  );
}
