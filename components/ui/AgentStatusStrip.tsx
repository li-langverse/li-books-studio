import { cn } from "./cn";
import { Badge } from "./Badge";

export type AgentStatus = "idle" | "running" | "clarify" | "done";

const statusConfig: Record<
  AgentStatus,
  { label: string; badge: "muted" | "info" | "warning" | "success"; dot: string; aria: string }
> = {
  idle: {
    label: "Bereit",
    badge: "muted",
    dot: "bg-[var(--klaut-agent-idle)]",
    aria: "Agent ist bereit",
  },
  running: {
    label: "Verarbeitet…",
    badge: "info",
    dot: "bg-[var(--klaut-agent-running)] animate-pulse",
    aria: "Agent verarbeitet Anfrage",
  },
  clarify: {
    label: "Rückfrage offen",
    badge: "warning",
    dot: "bg-[var(--klaut-agent-clarify)]",
    aria: "Agent wartet auf deine Bestätigung",
  },
  done: {
    label: "Abgeschlossen",
    badge: "success",
    dot: "bg-[var(--klaut-agent-done)]",
    aria: "Agent-Aufgabe abgeschlossen",
  },
};

export function AgentStatusStrip({
  status,
  context,
  className,
}: {
  status: AgentStatus;
  context?: string;
  className?: string;
}) {
  const cfg = statusConfig[status];

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-[var(--klaut-radius-md)] border border-[var(--klaut-border)] bg-[var(--klaut-bg-elevated)] px-4 py-2.5 shadow-[var(--klaut-shadow-sm)]",
        className,
      )}
      role="status"
      aria-label={cfg.aria}
      data-agent-status={status}
    >
      <div className="flex items-center gap-2.5">
        <span className={cn("h-2.5 w-2.5 rounded-full", cfg.dot)} aria-hidden />
        <span className="text-sm font-medium text-[var(--klaut-text)]">Books-Agent</span>
        <Badge variant={cfg.badge}>{cfg.label}</Badge>
      </div>
      {context ? (
        <span className="truncate text-xs text-[var(--klaut-text-muted)]">{context}</span>
      ) : null}
    </div>
  );
}
