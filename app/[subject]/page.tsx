import Link from "next/link";
import { notFound } from "next/navigation";
import { subjects, getSubject } from "@/lib/subjects";
import { getEntriesForSubject } from "@/lib/content";

export function generateStaticParams() {
  return subjects.map((s) => ({ subject: s.slug }));
}

export default async function SubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectSlug } = await params;
  const subject = getSubject(subjectSlug);
  if (!subject) notFound();

  const entries = getEntriesForSubject(subjectSlug);
  const notes = entries.filter((e) => e.kind === "notes");
  const assignments = entries.filter((e) => e.kind === "assignments");

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
        <div className="address-tag mb-3" style={{ color: subject.color }}>
          {subject.address}
        </div>
        <h1 className="font-mono text-3xl md:text-4xl font-bold text-[var(--ink)]">
          {subject.name}
        </h1>
        <p className="mt-3 text-[var(--ink-dim)] max-w-xl">
          {subject.description}
        </p>
      </header>

      <EntrySection
        title="NOTES"
        offset="0x1"
        entries={notes}
        subjectSlug={subjectSlug}
        kind="notes"
        accent={subject.color}
      />
      <EntrySection
        title="ASSIGNMENTS"
        offset="0x2"
        entries={assignments}
        subjectSlug={subjectSlug}
        kind="assignments"
        accent={subject.color}
      />
    </main>
  );
}

function EntrySection({
  title,
  offset,
  entries,
  subjectSlug,
  kind,
  accent,
}: {
  title: string;
  offset: string;
  entries: ReturnType<typeof getEntriesForSubject>;
  subjectSlug: string;
  kind: "notes" | "assignments";
  accent: string;
}) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-8">
      <div className="address-tag mb-6">
        {offset}xxx — {title}
      </div>

      {entries.length === 0 ? (
        <p className="text-sm text-[var(--ink-dim)] font-mono py-6 border-t border-[var(--rule)]">
          nothing here yet.
        </p>
      ) : (
        <div className="flex flex-col">
          {entries.map((entry) => (
            <Link
              key={entry.slug}
              href={`/${subjectSlug}/${kind}/${entry.slug}`}
              className="group flex items-start gap-4 py-5 border-t border-[var(--rule)] hover:border-t-[var(--accent-dim)] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3
                    className="font-mono text-base font-medium text-[var(--ink)] transition-colors"
                    style={{ color: undefined }}
                  >
                    <span className="group-hover:underline decoration-[var(--accent-dim)] underline-offset-4">
                      {entry.title}
                    </span>
                  </h3>
                  {entry.status && (
                    <span
                      className="text-[10px] font-mono uppercase tracking-wide px-2 py-0.5 rounded-full border"
                      style={{
                        borderColor:
                          entry.status === "done" ? accent : "var(--rule-bright)",
                        color:
                          entry.status === "done" ? accent : "var(--label)",
                      }}
                    >
                      {entry.status}
                    </span>
                  )}
                </div>
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
              <span className="text-xs font-mono text-[var(--label)] shrink-0 pt-1">
                {entry.date}
              </span>
            </Link>
          ))}
          <div className="border-t border-[var(--rule)]" />
        </div>
      )}
    </section>
  );
}
