"use client";

import { useState } from "react";
import {
  AgentStatusStrip,
  Alert,
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  PageHeader,
  Select,
  type AgentStatus,
} from "@/components/ui";

type Message = { role: "user" | "assistant"; content: string };

const TAX_YEARS = [2023, 2024, 2025];

export function ChatShell() {
  const [taxYear, setTaxYear] = useState(2024);
  const [unlocked, setUnlocked] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Willkommen bei li-books. Wähle das Steuerjahr, lade Belege hoch oder stelle eine Frage.",
    },
  ]);
  const [input, setInput] = useState("");
  const [clarifications, setClarifications] = useState(0);
  const [posted, setPosted] = useState(false);
  const [running, setRunning] = useState(false);

  function agentStatus(): AgentStatus {
    if (posted) return "done";
    if (clarifications > 0) return "clarify";
    if (running) return "running";
    return "idle";
  }

  function send() {
    if (!input.trim()) return;
    const text = input.trim();
    setInput("");
    setRunning(true);
    setMessages((m) => [...m, { role: "user", content: text }]);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: `[${taxYear}] Ich prüfe den Beleg und die Steuerkategorie…` },
      ]);
      setRunning(false);
    }, 400);
  }

  function onUpload() {
    setClarifications(1);
    setMessages((m) => [
      ...m,
      {
        role: "assistant",
        content: `[${taxYear}] Beleg erkannt (Entwurf). Bitte Kategorie bestätigen: Bewirtung (70%)?`,
      },
    ]);
  }

  function confirmClarify() {
    setClarifications(0);
    setMessages((m) => [...m, { role: "assistant", content: "Bereit zum Buchen — bitte bestätigen." }]);
  }

  function confirmPost() {
    if (!unlocked) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `${taxYear} ist gesperrt — einmaliges Freischalten pro Steuerjahr erforderlich (Scan/Klären weiter möglich).`,
        },
      ]);
      return;
    }
    setPosted(true);
    setMessages((m) => [...m, { role: "assistant", content: "Gebucht mit Gesetzesverweis §4 Abs. 5 EStG." }]);
  }

  const readyToPost =
    !posted &&
    clarifications === 0 &&
    messages.some((m) => m.content.includes("Bereit zum Buchen"));

  return (
    <main data-testid="chat-home" className="mx-auto max-w-3xl px-6 py-8">
      <PageHeader
        title="Books"
        description="Agentische Buchhaltung — Belege scannen, kategorisieren und buchen."
      />

      <AgentStatusStrip
        status={agentStatus()}
        context={`Steuerjahr ${taxYear}`}
        className="mb-6"
      />

      <div className="mb-6 flex flex-wrap items-end gap-4">
        <Select
          label="Steuerjahr"
          id="tax-year"
          data-testid="tax-year-picker"
          value={taxYear}
          onChange={(e) => {
            setTaxYear(Number(e.target.value));
            setPosted(false);
            setUnlocked(false);
          }}
          className="min-w-[120px]"
        >
          {TAX_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>

        {!unlocked ? (
          <Button data-testid="unlock-year" type="button" variant="secondary" onClick={() => setUnlocked(true)}>
            {taxYear} freischalten (Stub)
          </Button>
        ) : (
          <Badge variant="success" data-testid="year-unlocked">
            {taxYear} freigeschaltet ✓
          </Badge>
        )}
      </div>

      <Card className="mb-4">
        <div
          data-testid="chat-thread"
          className="flex min-h-60 flex-col gap-3"
          role="log"
          aria-live="polite"
          aria-label="Chat-Verlauf"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              data-testid={`msg-${m.role}`}
              className={
                m.role === "user"
                  ? "ml-8 rounded-[var(--klaut-radius-md)] bg-[var(--klaut-teal-50)] px-4 py-2.5 text-sm"
                  : "mr-8 rounded-[var(--klaut-radius-md)] bg-[var(--klaut-slate-100)] px-4 py-2.5 text-sm"
              }
            >
              <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wide text-[var(--klaut-text-muted)]">
                {m.role === "user" ? "Du" : "Agent"}
              </span>
              {m.content}
            </div>
          ))}
        </div>
      </Card>

      <div className="mb-4 flex gap-2">
        <Input
          data-testid="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Nachricht…"
          className="flex-1"
          aria-label="Chat-Nachricht"
        />
        <Button data-testid="chat-send" type="button" onClick={send} disabled={running || !input.trim()}>
          Senden
        </Button>
      </div>

      <button
        type="button"
        data-testid="upload-zone"
        onClick={onUpload}
        className="mb-4 w-full rounded-[var(--klaut-radius-lg)] border-2 border-dashed border-[var(--klaut-border-strong)] bg-[var(--klaut-bg-elevated)] px-6 py-8 text-center text-sm text-[var(--klaut-text-muted)] transition-colors hover:border-[var(--klaut-teal-600)] hover:bg-[var(--klaut-teal-50)] hover:text-[var(--klaut-teal-900)]"
      >
        <span className="block text-base font-medium text-[var(--klaut-text)]">Beleg hochladen</span>
        Klick zum Test-Upload — Jahr {taxYear}
      </button>

      {clarifications > 0 && (
        <Card
          data-testid="clarify-card"
          className="mb-4 border-[var(--klaut-warning-border)] bg-[var(--klaut-warning-bg)]"
        >
          <CardHeader>
            <CardTitle>Rückfrage vom Agent</CardTitle>
            <CardDescription>
              Offene Rückfragen: {clarifications} — Kategorie bestätigen, um fortzufahren.
            </CardDescription>
          </CardHeader>
          <Button data-testid="clarify-confirm" type="button" onClick={confirmClarify}>
            Bewirtung bestätigen
          </Button>
        </Card>
      )}

      {readyToPost && (
        <Button data-testid="post-confirm" type="button" onClick={confirmPost} className="mb-4">
          Buchen bestätigen
        </Button>
      )}

      {posted && (
        <Alert variant="success" title="Gebucht">
          <span data-testid="posted-badge">Gebucht ✓ — mit Gesetzesverweis §4 Abs. 5 EStG.</span>
        </Alert>
      )}
    </main>
  );
}
