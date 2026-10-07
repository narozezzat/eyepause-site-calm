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
    options.find((o) => o.status !== "coming-soon")?.platformId ?? options[0]?.platformId ?? "";
  const recommendedId = options.some((o) => o.platformId === detected) ? detected : null;
  const selectedId = override ?? recommendedId ?? fallbackId;
  const selected = options.find((o) => o.platformId === selectedId);
  const installSteps = platforms.find((p) => p.id === selectedId)?.installSteps ?? [];

  if (!selected) return null;

  return (
    <div>
      {detected && isMobile(detected) && <MobileNotice />}
      <PlatformPicker
        options={options}
        selectedId={selectedId}
        recommendedId={recommendedId}
        onSelect={setOverride}
      />
      <div className="mt-5 min-h-52.5" aria-live="polite">
        <DownloadButton key={selectedId} option={selected} installSteps={installSteps} />
      </div>
    </div>
  );
}
