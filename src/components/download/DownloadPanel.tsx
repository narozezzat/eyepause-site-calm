"use client";

import { useState } from "react";
import { platforms } from "@/config/platforms";
import { useDetectedPlatform } from "@/hooks/useDetectedPlatform";
import { isMobile } from "@/lib/platform/detect";
import type { DownloadOption } from "@/lib/releases";
import { DownloadButton } from "./DownloadButton";
import { MobileNotice } from "./MobileNotice";
import { PlatformPicker } from "./PlatformPicker";

interface DownloadPanelProps {
  options: DownloadOption[];
}

export function DownloadPanel({ options }: DownloadPanelProps) {
  const detected = useDetectedPlatform();
  const [override, setOverride] = useState<string | null>(null);

  const fallbackId =
    options.find((o) => o.status !== "coming-soon")?.platformId ??
    options[0]?.platformId ??
    "";
  const recommendedId = options.some((o) => o.platformId === detected)
    ? detected
    : null;
  const selectedId = override ?? recommendedId ?? fallbackId;
  const selected = options.find((o) => o.platformId === selectedId);
  const installSteps =
    platforms.find((p) => p.id === selectedId)?.installSteps ?? [];

  if (!selected) return null;

  return (
    <div className="download-panel">
      {detected && isMobile(detected) && <MobileNotice />}
      <PlatformPicker
        options={options}
        selectedId={selectedId}
        recommendedId={recommendedId}
        onSelect={setOverride}
      />
      <div aria-live="polite">
        <div className="download-product">
          <div className="app-icon">
            <svg className="icon" aria-hidden="true">
              <use href="#eye" />
            </svg>
          </div>
          <div>
            <h3>
              EyePause for {selected.label === "macOS" ? "Mac" : selected.label}
            </h3>
            <p>
              {selected.status === "coming-soon"
                ? "A little rest is on its way."
                : "A little care, in your menu bar."}
            </p>
          </div>
        </div>
        <DownloadButton
          key={selectedId}
          option={selected}
          installSteps={installSteps}
        />
      </div>
    </div>
  );
}
