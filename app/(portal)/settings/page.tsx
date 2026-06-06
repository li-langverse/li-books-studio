import { Card, CardDescription, CardHeader, CardTitle, PageHeader } from "@/components/ui";

const SETTINGS_SECTIONS = [
  {
    title: "Profil",
    description: "Name, E-Mail und Sprache — demnächst über GoTrue.",
    status: "Geplant",
  },
  {
    title: "TTS-Token-Pool",
    description: "Ein Pool pro Benutzer für metered API-Aufrufe via klaut_sk_ Keys.",
    status: "Geplant",
  },
  {
    title: "Abrechnung",
    description: "Nutzung, Limits und Rechnungen — Stripe-Integration folgt.",
    status: "Geplant",
  },
  {
    title: "API-Schlüssel",
    description: "Vault-backed Exchange-Keys für Books und Crypto-Sync.",
    status: "Verfügbar",
    href: "/secrets",
  },
] as const;

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-8">
      <PageHeader
        title="Einstellungen"
        description="Profil, Token-Pool und Abrechnung — API-Schlüssel findest du unter Secrets."
      />

      <div className="flex flex-col gap-4">
        {SETTINGS_SECTIONS.map((section) => (
          <Card key={section.title}>
            <CardHeader>
              <div className="flex items-center justify-between gap-4">
                <CardTitle>{section.title}</CardTitle>
                <span
                  className={
                    section.status === "Verfügbar"
                      ? "rounded-full bg-[var(--klaut-teal-50)] px-2.5 py-0.5 text-xs font-medium text-[var(--klaut-teal-900)]"
                      : "rounded-full bg-[var(--klaut-slate-100)] px-2.5 py-0.5 text-xs font-medium text-[var(--klaut-slate-600)]"
                  }
                >
                  {section.status}
                </span>
              </div>
              <CardDescription>
                {section.description}
                {"href" in section && section.href ? (
                  <>
                    {" "}
                    <a href={section.href} className="font-medium text-[var(--klaut-primary)] underline-offset-2 hover:underline">
                      Zu Secrets →
                    </a>
                  </>
                ) : null}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </main>
  );
}
