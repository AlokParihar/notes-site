"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type SearchRecord = {
  title: string;
  url: string;
  section: string;
  headings: string;
  text: string;
};

const MAX_RESULTS = 20;
const SNIPPET_BEFORE = 60;
const SNIPPET_LENGTH = 180;

function tokenize(q: string): string[] {
  return q.toLowerCase().split(/\s+/).filter(Boolean);
}

type Result = { record: SearchRecord; score: number; snippet: string; first: number };

function runSearch(records: SearchRecord[], query: string): Result[] {
  const words = tokenize(query);
  if (words.length === 0) return [];
  const out: Result[] = [];

  for (const r of records) {
    const title = r.title.toLowerCase();
    const headings = r.headings.toLowerCase();
    const text = r.text.toLowerCase();
    let score = 0;
    let first = -1;
    let ok = true;

    // Every word must appear somewhere on the page (AND search).
    for (const w of words) {
      const inTitle = title.includes(w);
      const inHeadings = headings.includes(w);
      const idx = text.indexOf(w);
      if (!inTitle && !inHeadings && idx === -1) {
        ok = false;
        break;
      }
      if (inTitle) score += 10;
      if (inHeadings) score += 5;
      if (idx !== -1) {
        score += Math.min(text.split(w).length - 1, 10);
        if (first === -1 || idx < first) first = idx;
      }
    }
    if (!ok) continue;

    let snippet = "";
    if (first !== -1) {
      const start = Math.max(0, first - SNIPPET_BEFORE);
      snippet =
        (start > 0 ? "…" : "") +
        r.text.slice(start, start + SNIPPET_LENGTH) +
        (start + SNIPPET_LENGTH < r.text.length ? "…" : "");
    } else {
      snippet = r.text.slice(0, SNIPPET_LENGTH);
    }
    out.push({ record: r, score, snippet, first });
  }

  return out.sort((a, b) => b.score - a.score).slice(0, MAX_RESULTS);
}

// Wraps matching words in <mark>. Built as React nodes, so no HTML injection.
function Highlight({ text, words }: { text: string; words: string[] }) {
  if (words.length === 0) return <>{text}</>;
  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(re);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="bg-transparent text-[var(--amber)] font-semibold">
            {p}
          </mark>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export default function SearchClient() {
  const router = useRouter();
  const params = useSearchParams();
  const urlQuery = params.get("q") ?? "";

  const [records, setRecords] = useState<SearchRecord[] | null>(null);
  const [failed, setFailed] = useState(false);

  // Download the index once, only on this page.
  useEffect(() => {
    let cancelled = false;
    fetch("/search-index.json")
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json();
      })
      .then((data: SearchRecord[]) => {
        if (!cancelled) setRecords(data);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(
    () => (records ? runSearch(records, urlQuery) : []),
    [records, urlQuery]
  );
  const words = tokenize(urlQuery);

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = new FormData(e.currentTarget).get("q");
    const q = typeof value === "string" ? value.trim() : "";
    router.replace(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <div>
      <form onSubmit={submit} role="search" className="flex gap-2">
        <input
          type="search"
          name="q"
          // key resets the box when the URL query changes (e.g. search from the top bar).
          key={urlQuery}
          defaultValue={urlQuery}
          placeholder="Search notes, PYQs, questions…"
          aria-label="Search"
          autoFocus
          className="flex-1 min-w-0 bg-transparent border border-[var(--rule-bright)] rounded px-3 py-2 text-sm font-mono text-[var(--ink)] placeholder:text-[var(--label)] focus:outline-none focus:border-[var(--amber)]"
        />
        <button
          type="submit"
          className="text-xs font-mono text-[var(--amber)] border border-[var(--rule-bright)] rounded px-4 hover:border-[var(--amber)] transition-colors"
        >
          search
        </button>
      </form>

      <div className="mt-6" aria-live="polite">
        {failed && (
          <p className="text-sm text-[var(--ink-dim)]">
            Couldn&apos;t load the search data. Refresh the page and try again.
          </p>
        )}
        {!failed && !records && urlQuery && (
          <p className="text-sm text-[var(--ink-dim)]">Loading search data…</p>
        )}
        {records && !urlQuery && (
          <p className="text-sm text-[var(--ink-dim)]">
            Type a topic, like <em>AVL rotation</em>, <em>pigeonhole</em> or{" "}
            <em>encapsulation</em>.
          </p>
        )}
        {records && urlQuery && results.length === 0 && (
          <p className="text-sm text-[var(--ink-dim)]">
            Nothing found for &ldquo;{urlQuery}&rdquo;. Try fewer or simpler words.
          </p>
        )}
        {results.length > 0 && (
          <>
            <p className="text-xs font-mono text-[var(--label)] mb-2">
              {results.length === MAX_RESULTS ? `top ${MAX_RESULTS}` : results.length}{" "}
              {results.length === 1 ? "page" : "pages"}
            </p>
            <ul className="flex flex-col">
              {results.map(({ record, snippet }) => (
                <li key={record.url} className="border-t border-[var(--rule)]">
                  <Link href={record.url} className="group block py-4">
                    <span className="block text-xs font-mono text-[var(--label)]">
                      {record.section}
                    </span>
                    <span className="block font-mono text-base text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mt-1">
                      <Highlight text={record.title} words={words} />
                    </span>
                    <span className="block text-sm text-[var(--ink-dim)] mt-1 leading-relaxed">
                      <Highlight text={snippet} words={words} />
                    </span>
                  </Link>
                </li>
              ))}
              <li className="border-t border-[var(--rule)]" />
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
