import Link from "next/link";
import { notFound } from "next/navigation";
import { getSubject } from "@/lib/subjects";
import { getEntry, getAllEntryMeta, EntryKind, KIND_LABELS, KIND_ORDER } from "@/lib/content";

export function generateStaticParams() {
  const all = getAllEntryMeta();
  return all.map((e) => ({
    subject: e.subjectSlug,
    kind: e.kind,
    slug: e.slug,
  }));
}

export default async function EntryPage({
  params,
}: {
  params: Promise<{ subject: string; kind: string; slug: string }>;
}) {
  const { subject: subjectSlug, kind, slug } = await params;
  const subject = getSubject(subjectSlug);
  if (!subject || !KIND_ORDER.includes(kind as EntryKind)) notFound();

  const entry = await getEntry(subjectSlug, kind as EntryKind, slug);
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
            href={`/${subjectSlug}`}
            className="hover:text-[var(--amber)] transition-colors"
            style={{ color: subject.color }}
          >
            {subject.address}
          </Link>
          <span className="text-[var(--rule-bright)]">/</span>
          <span className="text-[var(--label)] uppercase">
            {KIND_LABELS[kind as EntryKind]}
          </span>
        </div>

        <h1 className="font-mono text-2xl md:text-3xl font-bold text-[var(--ink)] leading-snug">
          {entry.title}
        </h1>

        <div className="flex items-center gap-3 mt-3 text-xs font-mono text-[var(--label)]">
          {entry.date && <span>{entry.date}</span>}
          {entry.status && (
            <>
              <span>·</span>
              <span style={{ color: entry.status === "done" ? subject.color : "var(--label)" }}>
                {entry.status}
              </span>
            </>
          )}
        </div>

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
        <div className="prose-note" dangerouslySetInnerHTML={{ __html: entry.html }} />
      </article>

      <div className="max-w-3xl mx-auto px-6 pb-16">
        <Link
          href={`/${subjectSlug}`}
          className="address-tag hover:text-[var(--amber)] transition-colors"
        >
          ← back to {subject.name}
        </Link>
      </div>
    </main>
  );
}
