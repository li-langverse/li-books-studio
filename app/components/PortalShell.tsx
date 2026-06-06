"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui/cn";

const NAV = [
  { href: "/books", label: "Books", testId: "nav-books", icon: "📒" },
  { href: "/secrets", label: "Secrets", testId: "nav-secrets", icon: "🔐" },
  { href: "/settings", label: "Settings", testId: "nav-settings", icon: "⚙️" },
] as const;

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div data-testid="klaut-portal" className="flex min-h-screen">
      <aside className="flex w-60 shrink-0 flex-col border-r border-[var(--klaut-slate-800)] bg-[var(--klaut-bg-sidebar)] px-4 py-6">
        <div className="mb-8 flex items-center gap-2 px-2">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-[var(--klaut-radius-md)] bg-[var(--klaut-teal-800)] text-sm font-bold text-white"
            aria-hidden
          >
            k
          </span>
          <div>
            <div className="text-lg font-semibold tracking-tight text-[var(--klaut-text-on-dark)]">
              klaut.pro
            </div>
            <div className="text-xs text-[var(--klaut-text-on-dark-muted)]">Agentic Portal</div>
          </div>
        </div>

        <nav className="flex flex-col gap-1" aria-label="Hauptnavigation">
          {NAV.map(({ href, label, testId, icon }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                data-testid={testId}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 rounded-[var(--klaut-radius-md)] px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-[var(--klaut-teal-900)] text-white"
                    : "text-[var(--klaut-text-on-dark-muted)] hover:bg-[var(--klaut-slate-800)] hover:text-[var(--klaut-text-on-dark)]",
                )}
              >
                <span aria-hidden>{icon}</span>
                {label}
              </Link>
            );
          })}
        </nav>

        <p className="mt-auto px-2 pt-8 text-xs text-[var(--klaut-text-on-dark-muted)]">
          Mail &amp; Search — demnächst
        </p>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-[var(--klaut-bg)]">{children}</div>
    </div>
  );
}
