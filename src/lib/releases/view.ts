import { formatBytes, formatDate } from "@/lib/format";
import type { DownloadFile, DownloadOption } from "./types";

/**
 * What the download area should show for a platform:
 * - `available`: the primary installer is attached.
 * - `error`: the primary installer is missing but another format is attached.
 * - `unavailable`: nothing is attached (e.g. a fallback build without release files).
 * - `coming-soon`: no build exists for the platform yet.
 */
export type DownloadView = "available" | "error" | "unavailable" | "coming-soon";

export function downloadView(option: DownloadOption): DownloadView {
  if (option.status === "coming-soon") return "coming-soon";
  if (option.primary) return "available";
  if (option.alternate) return "error";
  return "unavailable";
}

/** The small print under a download button: version · size · requirement · date. */
export function downloadMeta(option: DownloadOption, file: DownloadFile | null = option.primary): string[] {
  return [
    `Version ${option.version}`,
    file ? formatBytes(file.size) : null,
    option.requirementShort,
    formatDate(option.publishedAt),
  ].filter((part): part is string => Boolean(part));
}
