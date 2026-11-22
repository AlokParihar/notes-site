import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import SearchClient from "./search-client";

export const metadata: Metadata = {
  title: "Search",
  description: "Search all syllabus, notes, question banks and previous-year papers.",
};

export default function SearchPage() {
  return (
    <main className="flex-1 max-w-5xl w-full mx-auto px-6 pt-10 pb-16">
      <Link
        href="/"
        className="text-xs font-mono text-[var(--label)] hover:text-[var(--accent)]"
      >
        ← home
      </Link>
      <div className="address-tag mt-6 mb-3">SEARCH</div>
      <Suspense fallback={<p className="text-sm text-[var(--ink-dim)]">Loading…</p>}>
        <SearchClient />
      </Suspense>
    </main>
  );
}
