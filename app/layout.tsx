import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "klaut.pro",
  description: "Unified portal — Books, Secrets, and more",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
