const API_BASE =
  process.env.NEXT_PUBLIC_SECRETS_API_URL?.trim() ||
  process.env.NEXT_PUBLIC_API_BASE?.trim() ||
  "http://127.0.0.1:8083";

export type SecretMeta = { name: string; updated_at?: string };

function authHeaders(token: string): HeadersInit {
  return {
    Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function listSecrets(token: string): Promise<SecretMeta[]> {
  const res = await fetch(`${API_BASE}/v1/secrets`, { headers: authHeaders(token) });
  if (!res.ok) throw new Error(`list_secrets_failed:${res.status}`);
  const body = (await res.json()) as { secrets?: SecretMeta[] };
  return body.secrets ?? [];
}

export async function saveSecret(
  token: string,
  name: string,
  data: Record<string, string>
): Promise<void> {
  const res = await fetch(`${API_BASE}/v1/secrets/${encodeURIComponent(name)}`, {
    method: "PUT",
    headers: authHeaders(token),
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error(`save_secret_failed:${res.status}`);
}

export async function deleteSecret(token: string, name: string): Promise<void> {
  const res = await fetch(`${API_BASE}/v1/secrets/${encodeURIComponent(name)}`, {
    method: "DELETE",
    headers: authHeaders(token),
  });
  if (!res.ok && res.status !== 404) throw new Error(`delete_secret_failed:${res.status}`);
}
