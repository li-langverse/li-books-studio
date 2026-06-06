"use client";

import { useEffect, useState } from "react";
import { deleteSecret, listSecrets, saveSecret, type SecretMeta } from "../../src/lib/secrets-api";

const DEV_TOKEN_KEY = "klaut-dev-jwt";

type FormState = {
  binanceKey: string;
  binanceSecret: string;
  okxKey: string;
  okxSecret: string;
  okxPassphrase: string;
};

const EMPTY: FormState = {
  binanceKey: "",
  binanceSecret: "",
  okxKey: "",
  okxSecret: "",
  okxPassphrase: "",
};

export function SecretsPageContent() {
  const [token, setToken] = useState("");
  const [configured, setConfigured] = useState<SecretMeta[]>([]);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const stored = globalThis.sessionStorage?.getItem(DEV_TOKEN_KEY) ?? "";
    setToken(stored);
  }, []);

  async function refresh(jwt: string) {
    if (!jwt.trim()) {
      setConfigured([]);
      return;
    }
    const names = await listSecrets(jwt);
    setConfigured(names);
  }

  useEffect(() => {
    refresh(token).catch(() => setConfigured([]));
  }, [token]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function persist(name: string, data: Record<string, string>) {
    if (!token.trim()) {
      setStatus("JWT erforderlich — bitte anmelden.");
      return;
    }
    setBusy(true);
    setStatus(null);
    try {
      await saveSecret(token, name, data);
      await refresh(token);
      setStatus(`${name} gespeichert.`);
    } catch {
      setStatus("Speichern fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(name: string) {
    if (!token.trim()) return;
    setBusy(true);
    try {
      await deleteSecret(token, name);
      await refresh(token);
      setStatus(`${name} entfernt.`);
    } catch {
      setStatus("Löschen fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  }

  const has = (n: string) => configured.some((s) => s.name === n);

  return (
    <main data-testid="settings-secrets" style={{ maxWidth: 640, margin: "0 auto", padding: 24 }}>
      <h1>Deine API-Schlüssel</h1>
      <p style={{ color: "#555" }}>
        Ein Vault-Konto pro klaut.pro-Benutzer — Schlüssel gelten für Books, Crypto-Sync und weitere
        Produkte. Werte werden nie im Browser angezeigt.
      </p>

      <section style={{ marginTop: 24 }}>
        <label htmlFor="dev-jwt">JWT (dev)</label>
        <input
          id="dev-jwt"
          data-testid="secrets-jwt"
          type="password"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            sessionStorage.setItem(DEV_TOKEN_KEY, e.target.value);
          }}
          placeholder="Bearer token / JWT sub = user id"
          style={{ width: "100%", marginTop: 8 }}
        />
      </section>

      <section style={{ marginTop: 24 }}>
        <h2>Konfiguriert</h2>
        {configured.length === 0 ? (
          <p data-testid="secrets-empty">Noch keine Schlüssel gespeichert.</p>
        ) : (
          <ul data-testid="secrets-list">
            {configured.map((s) => (
              <li key={s.name}>
                {s.name}
                {s.updated_at ? ` — ${s.updated_at}` : ""}
                <button type="button" style={{ marginLeft: 8 }} onClick={() => remove(s.name)} disabled={busy}>
                  Entfernen
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>Binance</h2>
        <input
          type="password"
          placeholder="API Key"
          value={form.binanceKey}
          onChange={(e) => update("binanceKey", e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="API Secret"
          value={form.binanceSecret}
          onChange={(e) => update("binanceSecret", e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 8 }}
        />
        <button
          type="button"
          data-testid="save-binance"
          disabled={busy || !form.binanceKey || !form.binanceSecret}
          onClick={() =>
            persist("crypto/binance", { api_key: form.binanceKey, api_secret: form.binanceSecret })
          }
        >
          Binance speichern
        </button>
        {has("crypto/binance") ? <span style={{ marginLeft: 8 }}>✓ konfiguriert</span> : null}
      </section>

      <section style={{ marginTop: 32 }}>
        <h2>OKX</h2>
        <input
          type="password"
          placeholder="API Key"
          value={form.okxKey}
          onChange={(e) => update("okxKey", e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="API Secret"
          value={form.okxSecret}
          onChange={(e) => update("okxSecret", e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 8 }}
        />
        <input
          type="password"
          placeholder="Passphrase"
          value={form.okxPassphrase}
          onChange={(e) => update("okxPassphrase", e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: 8 }}
        />
        <button
          type="button"
          data-testid="save-okx"
          disabled={busy || !form.okxKey || !form.okxSecret || !form.okxPassphrase}
          onClick={() =>
            persist("crypto/okx", {
              api_key: form.okxKey,
              api_secret: form.okxSecret,
              passphrase: form.okxPassphrase,
            })
          }
        >
          OKX speichern
        </button>
        {has("crypto/okx") ? <span style={{ marginLeft: 8 }}>✓ konfiguriert</span> : null}
      </section>

      {status ? (
        <p data-testid="secrets-status" style={{ marginTop: 24 }}>
          {status}
        </p>
      ) : null}
    </main>
  );
}
