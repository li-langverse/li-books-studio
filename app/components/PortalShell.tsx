"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { KlautLogo } from "@/components/brand/KlautLogo";
import { NavIcon } from "@/components/brand/NavIcon";
import { cn } from "@/components/ui/cn";

const NAV = [
  { href: "/books", label: "Books", testId: "nav-books", icon: "books" as const },
  { href: "/secrets", label: "Secrets", testId: "nav-secrets", icon: "secrets" as const },
  { href: "/settings", label: "Settings", testId: "nav-settings", icon: "settings" as const },
] as const;

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div data-testid="klaut-portal" className="flex min-h-screen">
      <aside
        className="flex shrink-0 flex-col border-r border-[var(--klaut-slate-800)] bg-[var(--klaut-bg-sidebar)] px-4 py-6 shadow-[var(--klaut-shadow-sidebar)]"
        style={{ width: "var(--klaut-sidebar-width)" }}
      >
        <Link href="/books" className="mb-8 flex items-center gap-3 rounded-[var(--klaut-radius-md)] px-2 py-1 transition-opacity hover:opacity-90">
          <KlautLogo size={36} />
          <div>
            <div className="font-[family-name:var(--klaut-font-heading)] text-lg font-semibold tracking-tight text-[var(--klaut-text-on-dark)]">
              klaut.pro
            </div>
            <div className="text-xs text-[var(--klaut-text-on-dark-muted)]">
              Agentic Portal
            </div>
          </div>
        </Link>

        <nav className="flex flex-col gap-0.5" aria-label="Hauptnavigation">
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
                    ? "bg-[var(--klaut-teal-900)] text-white shadow-sm"
                    : "text-[var(--klaut-text-on-dark-muted)] hover:bg-[var(--klaut-slate-800)] hover:text-[var(--klaut-text-on-dark)]",
                )}
              >
                <NavIcon name={icon} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3 px-2 pt-8">
          <div className="h-px bg-[var(--klaut-slate-800)]" />
          <p className="text-xs leading-relaxed text-[var(--klaut-text-on-dark-muted)]">
            Mail &amp; Search — demnächst
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-[var(--klaut-bg)]">{children}</div>
    </div>
  );
}
