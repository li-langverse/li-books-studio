import { cn } from "./cn";

type AlertVariant = "info" | "success" | "warning" | "trust";

const variantClasses: Record<AlertVariant, string> = {
  info: "border-blue-200 bg-blue-50 text-blue-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  trust: "border-[var(--klaut-trust-border)] bg-[var(--klaut-trust-bg)] text-[var(--klaut-teal-900)]",
};

export function Alert({
  variant = "info",
  title,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: AlertVariant;
  title?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-[var(--klaut-radius-md)] border px-4 py-3 text-sm",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {title ? <p className="mb-1 font-semibold">{title}</p> : null}
      <div className={title ? "text-[var(--klaut-text-muted)]" : undefined}>{children}</div>
    </div>
  );
}
