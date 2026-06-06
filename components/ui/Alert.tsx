import { cn } from "./cn";

type AlertVariant = "info" | "success" | "warning" | "trust";

const variantClasses: Record<AlertVariant, string> = {
  info: "border-[var(--klaut-info-border)] bg-[var(--klaut-info-bg)] text-[var(--klaut-info-text)]",
  success: "border-[var(--klaut-success-border)] bg-[var(--klaut-success-bg)] text-[var(--klaut-success-text)]",
  warning: "border-[var(--klaut-warning-border)] bg-[var(--klaut-warning-bg)] text-[var(--klaut-warning-text)]",
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
