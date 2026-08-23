import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ARCHIVE_ORDER,
  ARCHIVE_LABELS,
  ArchiveCategory,
  getArchiveEntry,
  getAllArchiveMeta,
} from "@/lib/archive";

export function generateStaticParams() {
  const all = getAllArchiveMeta();
  return all.map((e) => ({ category: e.category, slug: e.slug }));
}

export default async function ArchiveEntryPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  if (!ARCHIVE_ORDER.includes(category as ArchiveCategory)) notFound();

  const entry = await getArchiveEntry(category as ArchiveCategory, slug);
  if (!entry) notFound();

  return (
    <main className="flex-1 relative">
      <div className="grain" />

      <header className="max-w-3xl mx-auto px-6 pt-14 pb-8">
        <div className="flex items-center gap-2 flex-wrap mb-6 address-tag">
          <Link href="/" className="hover:text-[var(--amber)] transition-colors">
            0x0000
          </Link>
          <span className="text-[var(--rule-bright)]">/</span>
          <Link
            href="/archive"
            className="hover:text-[var(--amber)] transition-colors"
            style={{ color: "#c99b5f" }}
          >
            0xF000
          </Link>
          <span className="text-[var(--rule-bright)]">/</span>
          <span className="text-[var(--label)]">
            {ARCHIVE_LABELS[category as ArchiveCategory]}
          </span>
        </div>

        <h1 className="font-mono text-2xl md:text-3xl font-bold text-[var(--ink)] leading-snug">
          {entry.title}
        </h1>

        {entry.date && (
          <div className="flex items-center gap-3 mt-3 text-xs font-mono text-[var(--label)]">
            <span>{entry.date}</span>
          </div>
        )}

        {entry.tags.length > 0 && (
          <div className="flex gap-2 mt-3 flex-wrap">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-mono text-[var(--label)] border border-[var(--rule)] rounded-full px-2 py-0.5"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="max-w-3xl mx-auto px-6">
        <div className="h-px bg-[var(--rule)] mb-8" />
      </div>

      <article className="max-w-3xl mx-auto px-6 pb-20">
        <div
          className="prose-note"
          dangerouslySetInnerHTML={{ __html: entry.html }}
        />
      </article>

      <div className="max-w-3xl mx-auto px-6 pb-16">
        <Link
          href="/archive"
          className="address-tag hover:text-[var(--amber)] transition-colors"
        >
          ← back to Archive
        </Link>
      </div>
    </main>
  );
}
