"use client";

import { useState } from "react";
import styles from "./Download.module.css";

type CopyState = "idle" | "copied" | "failed";

/** Phones can't run EyePause, so offer to carry the link over to a Mac instead. */
export function MobileNotice() {
  const [copy, setCopy] = useState<CopyState>("idle");

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href.split("#")[0]);
      setCopy("copied");
    } catch {
      setCopy("failed");
    }
  };

  return (
    <div className={styles.mobile}>
      <p>
        <strong>EyePause is a Mac app.</strong> Open this page on your Mac to
        install it.
      </p>
      <button type="button" className={styles.ghost} onClick={onCopy}>
        {copy === "copied" ? "Link copied" : "Copy link"}
      </button>
      <p className={styles.copyStatus} role="status">
        {copy === "copied"
          ? "Link copied to your clipboard."
          : copy === "failed"
            ? "Couldn't copy. Use your browser's share menu instead."
            : ""}
      </p>
    </div>
  );
}
