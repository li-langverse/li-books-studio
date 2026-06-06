import { cn } from "./cn";

export function Input({
  label,
  hint,
  error,
  className,
  id,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  error?: string;
}) {
  const inputId = id ?? (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="flex flex-col gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-[var(--klaut-text)]">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        className={cn(
          "w-full rounded-[var(--klaut-radius-md)] border border-[var(--klaut-border-strong)] bg-white px-3 py-2 text-sm text-[var(--klaut-text)]",
          "placeholder:text-[var(--klaut-slate-400)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--klaut-ring)] focus-visible:ring-offset-1",
          error && "border-[var(--klaut-agent-error)]",
          className,
        )}
        {...props}
      />
      {hint && !error ? <p className="text-xs text-[var(--klaut-text-muted)]">{hint}</p> : null}
      {error ? <p className="text-xs text-[var(--klaut-agent-error)]">{error}</p> : null}
    </div>
  );
}
