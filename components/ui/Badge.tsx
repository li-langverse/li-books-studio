import { cn } from "./cn";

type BadgeVariant = "default" | "success" | "warning" | "info" | "muted";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[var(--klaut-primary-subtle)] text-[var(--klaut-teal-900)] border-[var(--klaut-teal-100)]",
  success: "bg-[var(--klaut-success-bg)] text-[var(--klaut-success-text)] border-[var(--klaut-success-border)]",
  warning: "bg-[var(--klaut-warning-bg)] text-[var(--klaut-warning-text)] border-[var(--klaut-warning-border)]",
  info: "bg-[var(--klaut-info-bg)] text-[var(--klaut-info-text)] border-[var(--klaut-info-border)]",
  muted: "bg-[var(--klaut-slate-100)] text-[var(--klaut-slate-600)] border-[var(--klaut-slate-200)]",
};

export function Badge({
  variant = "default",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}
