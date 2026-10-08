import { Notice } from "@/components/ui/Notice";
import { CopyLink } from "./CopyLink";

/** Phones can't run EyePause, so offer to carry the link over to a Mac instead. */
export function MobileNotice() {
  return (
    <div className="mb-6 grid gap-3">
      <Notice tone="info" title="EyePause runs on macOS" announce={false}>
        <p>Open this page on your Mac to install it. Copy the link to send it over.</p>
      </Notice>
      <CopyLink />
    </div>
  );
}
