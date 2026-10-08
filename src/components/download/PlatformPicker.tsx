"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { DownloadOption } from "@/lib/releases";

interface PlatformPickerProps {
  options: DownloadOption[];
  selectedId: string;
  recommendedId: string | null;
  onSelect: (platformId: string) => void;
}

/** WAI-ARIA radio group: one tab stop, arrows/Home/End move and select. */
export function PlatformPicker({
  options,
  selectedId,
  recommendedId,
  onSelect,
}: PlatformPickerProps) {
  return (
    <RadioGroup
      className="platforms"
      aria-label="Choose your platform"
      value={selectedId}
      onValueChange={onSelect}
      loop
      onKeyDown={(event) => {
        // Radix moves focus on Home and End but only selects on arrows.
        if (event.key === "Home") onSelect(options[0].platformId);
        else if (event.key === "End") onSelect(options[options.length - 1].platformId);
      }}
    >
      {options.map((option) => {
        const recommended = option.platformId === recommendedId;
        const note = recommended
          ? "Detected"
          : option.status === "coming-soon"
            ? "Coming soon"
            : option.status === "unavailable"
              ? "Check back soon"
              : "Available now";
        return (
          <RadioGroupItem key={option.platformId} value={option.platformId} className="platform">
            <span>{option.label}</span>
            <small>{note}</small>
          </RadioGroupItem>
        );
      })}
    </RadioGroup>
  );
}
