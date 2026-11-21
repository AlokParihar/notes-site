import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";

const SITE_URL = "https://notes-site-theta.vercel.app";
const SITE_NAME = "Alok's Notes";
const SITE_DESCRIPTION =
  "Syllabus, previous-year papers and notes for RGPV CSE subjects, plus DSA practice and interview guides — worked through once and kept here.";

export const metadata: Metadata = {
  // Lets pages use relative URLs for link previews.
  metadataBase: new URL(SITE_URL),
  // Pages that set a title get " | Alok's Notes" added; the homepage uses `default`.
  title: {
    default: "Alok's Notes — memory map",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    title: "Alok's Notes — memory map",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
