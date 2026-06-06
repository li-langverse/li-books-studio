import { cn } from "./cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[var(--klaut-primary)] text-white hover:bg-[var(--klaut-primary-hover)] focus-visible:ring-[var(--klaut-ring)]",
  secondary:
    "bg-white text-[var(--klaut-text)] border border-[var(--klaut-border-strong)] hover:bg-[var(--klaut-slate-100)] focus-visible:ring-[var(--klaut-ring)]",
  ghost:
    "bg-transparent text-[var(--klaut-text-muted)] hover:bg-[var(--klaut-slate-100)] hover:text-[var(--klaut-text)] focus-visible:ring-[var(--klaut-ring)]",
  danger:
    "bg-[var(--klaut-agent-error)] text-white hover:bg-red-700 focus-visible:ring-red-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--klaut-radius-md)] font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
}
