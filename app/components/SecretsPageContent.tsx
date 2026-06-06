"use client";

import { useEffect, useState } from "react";
import { deleteSecret, listSecrets, saveSecret, type SecretMeta } from "../../src/lib/secrets-api";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  PageHeader,
} from "@/components/ui";

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
    <main data-testid="settings-secrets" className="mx-auto max-w-2xl px-6 py-8">
      <PageHeader
        title="Deine API-Schlüssel"
        description="Ein Vault-Konto pro klaut.pro-Benutzer — Schlüssel gelten für Books, Crypto-Sync und weitere Produkte."
      />

      <Alert variant="trust" title="Vertrauenswürdige Speicherung" className="mb-6">
        Werte werden nie im Browser angezeigt. Nur Metadaten (Name, Zeitstempel) erscheinen in der
        Liste — der eigentliche Schlüssel bleibt im Vault.
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Entwickler-Zugang</CardTitle>
          <CardDescription>Bearer token / JWT — sub = user id (nur für lokale Entwicklung)</CardDescription>
        </CardHeader>
        <Input
          id="dev-jwt"
          data-testid="secrets-jwt"
          type="password"
          label="JWT (dev)"
          value={token}
          onChange={(e) => {
            setToken(e.target.value);
            sessionStorage.setItem(DEV_TOKEN_KEY, e.target.value);
          }}
          placeholder="Bearer token / JWT sub = user id"
        />
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Konfiguriert</CardTitle>
          <CardDescription>Gespeicherte Secret-Namen — ohne Werte.</CardDescription>
        </CardHeader>
        {configured.length === 0 ? (
          <p data-testid="secrets-empty" className="text-sm text-[var(--klaut-text-muted)]">
            Noch keine Schlüssel gespeichert.
          </p>
        ) : (
          <ul data-testid="secrets-list" className="flex flex-col gap-2">
            {configured.map((s) => (
              <li
                key={s.name}
                className="flex items-center justify-between rounded-[var(--klaut-radius-md)] border border-[var(--klaut-border)] bg-[var(--klaut-slate-50)] px-3 py-2 text-sm"
              >
                <div>
                  <span className="font-medium">{s.name}</span>
                  {s.updated_at ? (
                    <span className="ml-2 text-xs text-[var(--klaut-text-muted)]">{s.updated_at}</span>
                  ) : null}
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => remove(s.name)} disabled={busy}>
                  Entfernen
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Binance</CardTitle>
            {has("crypto/binance") ? <Badge variant="success">✓ konfiguriert</Badge> : null}
          </div>
          <CardDescription>API-Schlüssel für Crypto-Sync und Books-Import.</CardDescription>
        </CardHeader>
        <div className="flex flex-col gap-3">
          <Input
            type="password"
            label="API Key"
            placeholder="API Key"
            value={form.binanceKey}
            onChange={(e) => update("binanceKey", e.target.value)}
          />
          <Input
            type="password"
            label="API Secret"
            placeholder="API Secret"
            value={form.binanceSecret}
            onChange={(e) => update("binanceSecret", e.target.value)}
          />
          <Button
            type="button"
            data-testid="save-binance"
            disabled={busy || !form.binanceKey || !form.binanceSecret}
            onClick={() =>
              persist("crypto/binance", { api_key: form.binanceKey, api_secret: form.binanceSecret })
            }
          >
            Binance speichern
          </Button>
        </div>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>OKX</CardTitle>
            {has("crypto/okx") ? <Badge variant="success">✓ konfiguriert</Badge> : null}
          </div>
          <CardDescription>Key, Secret und Passphrase für OKX.</CardDescription>
        </CardHeader>
        <div className="flex flex-col gap-3">
          <Input
            type="password"
            label="API Key"
            placeholder="API Key"
            value={form.okxKey}
            onChange={(e) => update("okxKey", e.target.value)}
          />
          <Input
            type="password"
            label="API Secret"
            placeholder="API Secret"
            value={form.okxSecret}
            onChange={(e) => update("okxSecret", e.target.value)}
          />
          <Input
            type="password"
            label="Passphrase"
            placeholder="Passphrase"
            value={form.okxPassphrase}
            onChange={(e) => update("okxPassphrase", e.target.value)}
          />
          <Button
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
          </Button>
        </div>
      </Card>

      {status ? (
        <Alert variant="info" data-testid="secrets-status">
          {status}
        </Alert>
      ) : null}
    </main>
  );
}
