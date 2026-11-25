import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import GoatCounter from "./goatcounter";
import MusicDisc from "./music-disc";
import { YOUTUBE_PLAYLIST, getPlaylistId } from "@/lib/music";
import { MILE_URL } from "@/lib/links";

const SITE_URL = "https://notes-site-theta.vercel.app";
const SITE_NAME = "The Inner Sanctum";
// Google Form that collects feedback; change this one line if the form ever moves.
const FEEDBACK_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSevkSCL84IfSkEyvhz8xvtPWzJpoT8VbOvqJPbbADNzRwhE-Q/viewform";
const SITE_DESCRIPTION =
  "Syllabus, previous-year papers and notes for RGPV CSE subjects, plus DSA practice and interview guides — worked through once and kept here.";

export const metadata: Metadata = {
  // Lets pages use relative URLs for link previews.
  metadataBase: new URL(SITE_URL),
  // Pages that set a title get " | The Inner Sanctum" added; the homepage uses `default`.
  title: {
    default: "The Inner Sanctum — memory map",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
    title: "The Inner Sanctum — memory map",
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
      <body className="min-h-full flex flex-col">
        <div className="w-full max-w-5xl mx-auto px-6 pt-4 flex items-center gap-3">
          {/* Top left: quick way to the college portal (opens in a new tab) */}
          <a
            href={MILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs font-mono text-[var(--accent)] border border-[var(--rule-bright)] rounded px-3 py-1.5 hover:border-[var(--accent)] transition-colors"
          >
            MILE ↗
          </a>
          <div className="flex flex-1 min-w-0 items-center justify-end gap-3">
            {/* Plain GET form: works even before JavaScript loads. */}
            <form action="/search" method="get" role="search" className="flex-1 min-w-0 sm:flex-none">
              <input
                type="search"
                name="q"
                placeholder="search…"
                aria-label="Search the site"
                className="w-full min-w-0 sm:w-56 bg-transparent border border-[var(--rule-bright)] rounded px-3 py-1.5 text-xs font-mono text-[var(--ink)] placeholder:text-[var(--label)] focus:outline-none focus:border-[var(--amber)]"
              />
            </form>
            <a
              href={FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-xs font-mono text-[var(--amber)] border border-[var(--rule-bright)] rounded px-3 py-1.5 hover:border-[var(--amber)] transition-colors"
            >
              give feedback ↗
            </a>
          </div>
        </div>
        {children}
        <GoatCounter />
        <MusicDisc />
        <footer className="w-full max-w-5xl mx-auto px-6 py-6 mt-auto border-t border-[var(--rule)]">
          <p className="text-xs font-mono text-[var(--label)]">
            Anonymous visit counts, no cookies.{" "}
            {getPlaylistId(YOUTUBE_PLAYLIST) &&
              "If you press play on the music, YouTube's player loads and may set its own. "}
            <a
              href={MILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--amber)] hover:underline"
            >
              MILE portal ↗
            </a>
            {" · "}
            Found a mistake or want something added?{" "}
            <a
              href={FEEDBACK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--amber)] hover:underline"
            >
              send feedback →
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
