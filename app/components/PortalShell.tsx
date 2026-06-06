"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/books", label: "Books", testId: "nav-books" },
  { href: "/secrets", label: "Secrets", testId: "nav-secrets" },
  { href: "/settings", label: "Settings", testId: "nav-settings" },
] as const;

export function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div data-testid="klaut-portal" style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 200,
          padding: "24px 16px",
          borderRight: "1px solid #e5e5e5",
          background: "#fafafa",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 24, fontSize: 18 }}>klaut.pro</div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {NAV.map(({ href, label, testId }) => {
            const active = pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                data-testid={testId}
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  textDecoration: "none",
                  color: active ? "#111" : "#555",
                  background: active ? "#eee" : "transparent",
                  fontWeight: active ? 600 : 400,
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <p style={{ marginTop: 32, fontSize: 12, color: "#888" }}>
          Mail & Search — coming soon
        </p>
      </aside>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}
