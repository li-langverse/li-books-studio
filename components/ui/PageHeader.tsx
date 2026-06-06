export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-[family-name:var(--klaut-font-heading)] text-2xl font-semibold tracking-tight text-[var(--klaut-text)]">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm text-[var(--klaut-text-muted)]">{description}</p>
        ) : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  );
}
