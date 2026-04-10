import "./globals.css";

/**
 * Root layout required by Next.js; `<html>` / `<body>` live in `app/[locale]/layout.tsx`
 * (see next-intl locale routing).
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
