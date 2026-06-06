"use client";

import { useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

export function ChatShell() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Willkommen bei li-books. Lade einen Beleg hoch oder stelle eine Frage." },
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
      { role: "assistant", content: "Ich prüfe den Beleg und die Steuerkategorie…" },
    ]);
  }

  function onUpload() {
    setClarifications(1);
    setMessages((m) => [
      ...m,
      { role: "assistant", content: "Beleg erkannt. Bitte Kategorie bestätigen: Bewirtung (70%)?" },
    ]);
  }

  function confirmClarify() {
    setClarifications(0);
    setMessages((m) => [...m, { role: "assistant", content: "Bereit zum Buchen — bitte bestätigen." }]);
  }

  function confirmPost() {
    setPosted(true);
    setMessages((m) => [...m, { role: "assistant", content: "Gebucht mit Gesetzesverweis §4 Abs. 5 EStG." }]);
  }

  return (
    <main data-testid="chat-home" style={{ maxWidth: 720, margin: "0 auto", padding: 24 }}>
      <h1>li-books</h1>
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
        Beleg hier ablegen (Klick zum Test-Upload)
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
