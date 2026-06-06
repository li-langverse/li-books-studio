"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const TAX_YEARS = [2023, 2024, 2025];

export function ChatShell() {
  const [taxYear, setTaxYear] = useState(2024);
  const [unlocked, setUnlocked] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Willkommen bei li-books. Wähle das Steuerjahr, lade Belege hoch oder stelle eine Frage." },
  ]);
  const [input, setInput] = useState("");
  const [clarifications, setClarifications] = useState(0);
  const [posted, setPosted] = useState(false);

  function send() {
    if (!input.trim()) return;
    setMessages((m) => [...m, { role: "user", content: input.trim() }]);
    setInput("");
    setMessages((m) => [
      ...m,
      { role: "assistant", content: `[${taxYear}] Ich prüfe den Beleg und die Steuerkategorie…` },
    ]);
  }

  function onUpload() {
    setClarifications(1);
    setMessages((m) => [
      ...m,
      { role: "assistant", content: `[${taxYear}] Beleg erkannt (Entwurf). Bitte Kategorie bestätigen: Bewirtung (70%)?` },
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
        { role: "assistant", content: `${taxYear} ist gesperrt — einmaliges Freischalten pro Steuerjahr erforderlich (Scan/Klären weiter möglich).` },
      ]);
      return;
    }
    setPosted(true);
    setMessages((m) => [...m, { role: "assistant", content: "Gebucht mit Gesetzesverweis §4 Abs. 5 EStG." }]);
  }

  return (
    <main data-testid="chat-home" style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Books</h1>
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <label htmlFor="tax-year">Steuerjahr</label>
        <select
          id="tax-year"
          data-testid="tax-year-picker"
          value={taxYear}
          onChange={(e) => {
            setTaxYear(Number(e.target.value));
            setPosted(false);
            setUnlocked(false);
          }}
        >
          {TAX_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
        {!unlocked && (
          <button
            data-testid="unlock-year"
            type="button"
            onClick={() => setUnlocked(true)}
          >
            {taxYear} freischalten (Stub)
          </button>
        )}
        {unlocked && <span data-testid="year-unlocked">{taxYear} freigeschaltet ✓</span>}
      </div>
      <div data-testid="chat-thread" style={{ minHeight: 240, border: "1px solid #cbd5e1", borderRadius: 8, padding: 12 }}>
        {messages.map((m, i) => (
          <p key={i} data-testid={`msg-${m.role}`}>
            <strong>{m.role}:</strong> {m.content}
          </p>
        ))}
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <input
          data-testid="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nachricht…"
          style={{ flex: 1, padding: 8 }}
        />
        <button data-testid="chat-send" type="button" onClick={send}>
          Senden
        </button>
      </div>
      <div
        data-testid="upload-zone"
        onClick={onUpload}
        style={{ marginTop: 16, padding: 24, border: "2px dashed #94a3b8", textAlign: "center", cursor: "pointer" }}
      >
        Beleg hier ablegen (Klick zum Test-Upload) — Jahr {taxYear}
      </div>
      {clarifications > 0 && (
        <div data-testid="clarify-card" style={{ marginTop: 16, padding: 12, background: "#fef3c7", borderRadius: 8 }}>
          <p>Offene Rückfragen: {clarifications}</p>
          <button data-testid="clarify-confirm" type="button" onClick={confirmClarify}>
            Bewirtung bestätigen
          </button>
        </div>
      )}
      {!posted && clarifications === 0 && messages.some((m) => m.content.includes("Bereit zum Buchen")) && (
        <button data-testid="post-confirm" type="button" onClick={confirmPost} style={{ marginTop: 12 }}>
          Buchen bestätigen
        </button>
      )}
      {posted && <p data-testid="posted-badge">Gebucht ✓</p>}
    </main>
  );
}
