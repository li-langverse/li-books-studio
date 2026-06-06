import { cn } from "./cn";

export function Select({
  label,
  hint,
  className,
  id,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
}) {
  const selectId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={selectId} className="text-sm font-medium text-[var(--klaut-text)]">
          {label}
        </label>
      ) : null}
      <select
        id={selectId}
        className={cn(
          "rounded-[var(--klaut-radius-md)] border border-[var(--klaut-border-strong)] bg-[var(--klaut-bg-elevated)] px-3 py-2 text-sm text-[var(--klaut-text)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--klaut-ring)] focus-visible:ring-offset-1",
          className,
        )}
        {...props}
      >
        {children}
      </select>
      {hint ? <p className="text-xs text-[var(--klaut-text-muted)]">{hint}</p> : null}
    </div>
  );
}
