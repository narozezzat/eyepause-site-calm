import { CircleAlert, CircleCheck, Info, type LucideIcon } from "lucide-react";
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

const icons: Record<NoticeTone, LucideIcon> = {
  info: Info,
  error: CircleAlert,
  success: CircleCheck,
};

/** Inline message with an icon. Uses the tone's soft background and a hairline border. */
export function Notice({ tone = "info", title, children, announce = true, className }: NoticeProps) {
  const Icon = icons[tone];
  const role = announce ? (tone === "error" ? "alert" : "status") : undefined;
  return (
    <Alert variant={tone} className={className} role={role}>
      <Icon
        className={cn(
          "mt-0.5 size-5 flex-none fill-none stroke-current stroke-[1.8] [stroke-linecap:round] [stroke-linejoin:round]",
          iconTone[tone],
        )}
        aria-hidden="true"
        focusable="false"
      />
      <div className="min-w-0 text-body-sm text-pretty text-fg-muted">
        {title && <AlertTitle>{title}</AlertTitle>}
        {children && <AlertDescription>{children}</AlertDescription>}
      </div>
    </Alert>
  );
}
