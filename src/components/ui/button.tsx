import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-w-target shrink-0 items-center justify-center gap-2 rounded-control font-semibold whitespace-nowrap select-none transition-[background-color,border-color,color,opacity] duration-150 ease-out aria-busy:cursor-progress aria-disabled:cursor-not-allowed aria-disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-fg text-bg hover:bg-fg/85 active:bg-fg/75",
        secondary:
          "border border-border-strong bg-surface text-fg hover:border-fg-subtle hover:bg-surface-2 active:bg-border",
        ghost: "text-fg-muted hover:bg-surface-2 hover:text-fg active:bg-border",
      },
      size: {
        md: "h-11 px-4 text-body-sm",
        lg: "h-12 px-5 text-base",
      },
      /** Full width below `sm`, for the primary call to action on phones. */
      fullWidthOnMobile: { true: "w-full sm:w-auto" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonVariantProps = Omit<VariantProps<typeof buttonVariants>, "fullWidthOnMobile"> & {
  fullWidthOnMobile?: boolean;
};

interface ButtonOwnProps extends ButtonVariantProps {
  /** Leading icon, decorative (aria-hidden is the caller's job). */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

type AsButton = ButtonOwnProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & { href?: undefined };
type AsLink = ButtonOwnProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & { href: string };
export type ButtonProps = AsButton | AsLink;

/** Primary, secondary or ghost action. Renders an anchor when given `href`. Minimum target 44×44. */
function Button(props: ButtonProps) {
  const { variant, size, fullWidthOnMobile, icon, children, className, ...rest } = props;
  const classes = cn(buttonVariants({ variant, size, fullWidthOnMobile }), className);
  const content = (
    <>
      {icon}
      {children}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a data-slot="button" {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button data-slot="button" type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} className={classes}>
      {content}
    </button>
  );
}

export { Button, buttonVariants };
