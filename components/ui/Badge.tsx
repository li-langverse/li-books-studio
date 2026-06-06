import { cn } from "./cn";

type BadgeVariant = "default" | "success" | "warning" | "info" | "muted";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-[var(--klaut-primary-subtle)] text-[var(--klaut-teal-900)] border-[var(--klaut-teal-100)]",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
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
