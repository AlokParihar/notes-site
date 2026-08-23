import Link from "next/link";
import { ARCHIVE_ORDER, ARCHIVE_LABELS, getArchiveByCategory } from "@/lib/archive";

export default function ArchivePage() {
  return (
    <main className="flex-1 relative">
      <div className="grain" />

      <header className="max-w-5xl mx-auto px-6 pt-14 pb-10">
        <Link
          href="/"
          className="address-tag inline-block mb-6 hover:text-[var(--amber)] transition-colors"
        >
          ← 0x0000
        </Link>
        <div className="address-tag mb-3" style={{ color: "#c99b5f" }}>
          0xF000 — ARCHIVE
        </div>
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-[var(--ink)]">
          Archive
        </h1>
        <p className="mt-3 text-[var(--ink-dim)] max-w-xl">
          Career-track material — not tied to any semester. DSA practice,
          interview guides, whatever&apos;s worth keeping around.
        </p>
      </header>

      {ARCHIVE_ORDER.map((category) => {
        const entries = getArchiveByCategory(category);
        return (
          <section key={category} className="max-w-5xl mx-auto px-6 py-8">
            <div className="address-tag mb-6">{ARCHIVE_LABELS[category]}</div>

            {entries.length === 0 ? (
              <p className="text-sm text-[var(--ink-dim)] font-mono py-6 border-t border-[var(--rule)]">
                nothing here yet.
              </p>
            ) : (
              <div className="flex flex-col">
                {entries.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/archive/${category}/${entry.slug}`}
                    className="group flex items-start gap-4 py-5 border-t border-[var(--rule)] hover:border-t-[var(--accent-dim)] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="font-mono text-base font-medium text-[var(--ink)]">
                        <span className="group-hover:underline decoration-[var(--accent-dim)] underline-offset-4">
                          {entry.title}
                        </span>
                      </h3>
                      {entry.summary && (
                        <p className="text-sm text-[var(--ink-dim)] mt-1.5 max-w-xl">
                          {entry.summary}
                        </p>
                      )}
                      {entry.tags.length > 0 && (
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[11px] font-mono text-[var(--label)]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="text-[var(--label)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all shrink-0 pt-1">
                      →
                    </span>
                  </Link>
                ))}
                <div className="border-t border-[var(--rule)]" />
              </div>
            )}
          </section>
        );
      })}
    </main>
  );
}
