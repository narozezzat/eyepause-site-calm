import type { ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export type NoticeTone = "info" | "error" | "success";

interface NoticeProps {
  tone?: NoticeTone;
  title?: ReactNode;
  children?: ReactNode;
  /** Announce the message when it appears: "status" (polite) or "alert" (errors). Off for static copy. */
  announce?: boolean;
  className?: string;
}

const iconTone: Record<NoticeTone, string> = {
  info: "text-fg-subtle",
  error: "text-danger",
  success: "text-success",
};

const icons: Record<NoticeTone, ReactNode> = {
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 7.5v.5" />
    </>
  ),
  error: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5M12 16v.5" />
    </>
  ),
  success: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.8 2.7L16.5 9.5" />
    </>
  ),
};

/** Inline message with an icon. Uses the tone's soft background and a hairline border. */
export function Notice({ tone = "info", title, children, announce = true, className }: NoticeProps) {
  const role = announce ? (tone === "error" ? "alert" : "status") : undefined;
  return (
    <Alert variant={tone} className={className} role={role}>
      <svg
        className={cn(
          "mt-0.5 size-5 flex-none fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]",
          iconTone[tone],
        )}
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
      >
        {icons[tone]}
      </svg>
      <div className="min-w-0 text-body-sm text-pretty text-fg-muted">
        {title && <AlertTitle>{title}</AlertTitle>}
        {children && <AlertDescription>{children}</AlertDescription>}
      </div>
    </Alert>
  );
}
