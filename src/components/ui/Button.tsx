import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "md" | "lg";

interface ButtonStyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Full width below `sm`, for the primary call to action on phones. */
  fullWidthOnMobile?: boolean;
}

const base =
  "inline-flex min-w-target shrink-0 items-center justify-center gap-2 rounded-control font-semibold whitespace-nowrap select-none transition-[background-color,border-color,color,opacity] duration-150 ease-out aria-busy:cursor-progress aria-disabled:cursor-not-allowed aria-disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-fg text-bg hover:bg-fg/85 active:bg-fg/75",
  secondary:
    "border border-border-strong bg-surface text-fg hover:border-fg-subtle hover:bg-surface-2 active:bg-border",
  ghost: "text-fg-muted hover:bg-surface-2 hover:text-fg active:bg-border",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-4 text-body-sm",
  lg: "h-12 px-5 text-base",
};

/** Class list for anything that should look like a Button (e.g. a download anchor). */
export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidthOnMobile = false,
}: ButtonStyleProps = {}): string {
  return cn(base, variants[variant], sizes[size], fullWidthOnMobile && "w-full sm:w-auto");
}

interface SharedProps extends ButtonStyleProps {
  /** Leading icon, decorative (aria-hidden is the caller's job). */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type AsButton = SharedProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & { href?: undefined };
type AsLink = SharedProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children"> & { href: string };

export type ButtonProps = AsButton | AsLink;

/** Primary, secondary or ghost action. Renders an anchor when given `href`. Minimum target 44×44. */
export function Button(props: ButtonProps) {
  const { variant, size, fullWidthOnMobile, icon, children, className, ...rest } = props;
  const classes = cn(buttonClasses({ variant, size, fullWidthOnMobile }), className);
  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonRest } = rest as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button {...buttonRest} type={type} className={classes}>
      {content}
    </button>
  );
}
