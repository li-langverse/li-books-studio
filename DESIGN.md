# klaut.pro Portal — Design System

**Brand:** Trustworthy agentic SaaS for German bookkeeping and secrets management.  
**Identity:** Deep teal (`#0d7377`) + slate neutrals, Inter typography. **Not** Majico orange.  
**Majico project:** `356e7acc-633d-4029-96a0-98e8a75fc3e5`  
**Tokens:** `design/tokens.css` (Majico palette + portal extensions)

## Voice & tone (German UI)

- Calm, precise, professional — finance-adjacent trust without corporate coldness.
- Prefer short labels: **Books**, **Secrets**, **Einstellungen**.
- Agent copy: explain *what* happened and *what* the user should confirm next.
- Never show secret values in UI — metadata only.

## Color palette

| Token | Hex | Use |
| --- | --- | --- |
| `--klaut-primary` | `#0d7377` | Primary actions, links, brand mark |
| `--klaut-primary-hover` | `#0a4f52` | Primary hover |
| `--klaut-bg` | `#f8fafc` | Page canvas |
| `--klaut-bg-sidebar` | `#0f172a` | Portal sidebar |
| `--klaut-text` | `#0f172a` | Headings and body |
| `--klaut-text-muted` | `#475569` | Secondary copy |
| `--klaut-agent-running` | `#2563eb` | Agent processing |
| `--klaut-agent-clarify` | `#d97706` | Needs user input |
| `--klaut-agent-done` | `#059669` | Task complete |

Full scales: teal 50–950, slate 50–950 in `design/tokens.css`.

## Typography

- **Font:** Inter via `next/font/google` → `--font-inter`
- **Headings:** `font-semibold`, `--klaut-font-heading`
- **Body:** regular/medium, `--klaut-font-body`
- **Page titles:** 2xl semibold (`PageHeader`)
- **Card titles:** base semibold

## Layout

- **PortalShell:** 240px dark sidebar + fluid main (`--klaut-sidebar-width`)
- **Books chat:** max-width 48rem (`max-w-3xl`)
- **Secrets / Settings:** max-width 42rem (`max-w-2xl`)
- **Spacing:** Tailwind 4px grid; section gaps `gap-4` / `mb-6`

## Components (`components/ui/`)

| Component | Brand notes |
| --- | --- |
| `Button` | Primary = teal + white on-color; secondary = elevated surface |
| `Card` | Elevated white, subtle shadow, `--klaut-radius-lg` |
| `AgentStatusStrip` | Always visible on Books — status dot + badge |
| `Alert` trust variant | Secrets page — teal tint, vault messaging |
| `Badge` | Token-based semantic colors (not raw Tailwind palettes) |
| `KlautLogo` | Sidebar mark — teal tile + “k” glyph |
| `NavIcon` | Stroke icons for nav (no emoji) |

## Agent surfaces (Books)

1. **Idle** — muted dot, “Bereit”
2. **Running** — blue pulse, “Verarbeitet…”
3. **Clarify** — amber warning card + confirm CTA
4. **Done** — green success alert

User bubbles: `--klaut-teal-50`. Agent bubbles: `--klaut-slate-100`.

## Secrets surfaces

- Trust alert at top (vault never echoes values).
- Exchange cards (Binance, OKX) with configured badge.
- Dev JWT block clearly labeled “nur für lokale Entwicklung”.

## Sync from Majico

```bash
# From klaut.pro repo:
node scripts/sync-majico-brand.mjs
```

Updates `DESIGN.md` prose from Majico; preserves full `design/tokens.css` extensions.

---

## Majico canonical excerpt

klaut.pro expresses a Sage-led identity: trustworthy agentic SaaS for German bookkeeping and secrets management. Accent `#0d7377` on slate `#f8fafc` / `#0f172a` sidebar. Inter for headings and body.
