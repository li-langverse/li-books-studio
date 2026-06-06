export function KlautLogo({ size = 32 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="32" height="32" rx="8" fill="var(--klaut-teal-800)" />
      <path
        d="M9 22V10h3.2l4.1 7.2V10H20v12h-3.1l-4.2-7.4V22H9z"
        fill="white"
      />
      <circle cx="23.5" cy="11.5" r="2" fill="var(--klaut-teal-500)" />
    </svg>
  );
}
