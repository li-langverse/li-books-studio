# klaut.pro Portal — Design System

**Brand:** Trustworthy agentic SaaS for German bookkeeping and secrets management.  
**Identity:** Deep teal + slate neutrals, crisp Inter sans-serif. **Not** Majico orange (#FF7800).  
**Accessibility:** WCAG AA contrast on primary text and interactive elements.

> Tokens sourced manually (Majico MCP credentials unavailable). See `design/tokens.css`.

## Color palette

| Token | Hex | Use |
| --- | --- | --- |
| `--klaut-teal-800` | `#0d7377` | Primary actions, brand accent |
| `--klaut-teal-900` | `#0a4f52` | Primary hover, sidebar highlights |
| `--klaut-slate-900` | `#0f172a` | Sidebar background |
| `--klaut-slate-50` | `#f8fafc` | Page background |
| `--klaut-agent-running` | `#2563eb` | Agent actively processing |
| `--klaut-agent-clarify` | `#d97706` | Agent blocked — needs user input |
| `--klaut-agent-done` | `#059669` | Task completed |

## Typography

- **Font:** Inter via `next/font/google`
- **Headings:** semibold, slate-900
- **Body:** regular, slate-700/600 for secondary copy
- **Monospace:** reserved for JWT dev fields (future)

## Layout

- **AppShell:** Fixed 240px sidebar (dark slate) + fluid main content area
- **Content max-width:** 720px for chat, 640px for secrets/settings
- **Spacing:** 4px base grid (Tailwind default)

## Components (`components/ui/`)

| Component | Purpose |
| --- | --- |
| `Button` | Primary, secondary, ghost, danger variants |
| `Input` | Text/password with label and error slot |
| `Select` | Native select styled to match Input |
| `Card` | Elevated surface for secrets forms and clarify panels |
| `Badge` | Status chips (configured, posted, agent state) |
| `Alert` | Trust messaging and status feedback |
| `PageHeader` | Title + description for each portal section |
| `AgentStatusStrip` | Idle / running / clarify agent chrome |

## Agentic UX (studio-agentic-ux checklist)

- [x] **Task state visible:** AgentStatusStrip shows idle → running → clarify → done
- [x] **Progress:** Chat thread streams assistant replies; no silent long runs in stub
- [x] **Errors:** Locked-year message is actionable (unlock button)
- [x] **Context:** Tax year picker + agent status in header region
- [x] **Clarify affordance:** Yellow clarify card with explicit confirm action
- [ ] Cancel (future — no long-running agent jobs in MVP stub)

## Secrets trust patterns

- Vault copy explains one account per user, values never displayed
- Password inputs only; configured state shown as badge not value
- JWT dev field clearly labeled as development-only

## Test IDs (preserved)

`klaut-portal`, `nav-books`, `nav-secrets`, `nav-settings`, `chat-home`, `settings-secrets`
