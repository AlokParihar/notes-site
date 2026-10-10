import Link from "next/link";
import { getSemesters } from "@/lib/subjects";
import { getEntriesForSubject } from "@/lib/content";

export default function Home() {
  const semesters = getSemesters();

  return (
    <main className="flex-1 relative">
      <div className="grain" />

      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="address-tag mb-3">0x0000 — ENTRY POINT</div>
        <h1 className="font-mono text-4xl md:text-5xl font-bold tracking-tight text-[var(--ink)] leading-tight">
          Alok&apos;s Notes
        </h1>
        <p className="mt-4 text-[var(--ink-dim)] max-w-xl leading-relaxed">
          Syllabus and Notes, worked through once and kept here — so
          nobody has to ask twice.
        </p>
      </header>

      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-[var(--rule)] mb-2" />
      </div>

      {/* Memory map grouped by semester */}
      {semesters.map(({ semester, subjects }) => (
        <section key={semester} className="max-w-5xl mx-auto px-6 py-10">
          <div className="address-tag mb-6">
            SEMESTER {semester} — {subjects.length} SUBJECT
            {subjects.length !== 1 ? "S" : ""} LOADED
          </div>

          <div className="flex flex-col">
            {subjects.map((subject) => {
              const entries = getEntriesForSubject(subject.slug);
              const noteCount = entries.filter(
                (e) => e.kind === "notes"
              ).length;
           
              return (
                <Link
                  key={subject.slug}
                  href={`/${subject.slug}`}
                  className="group relative flex items-center gap-6 py-6 border-t border-[var(--rule)] hover:border-t-[var(--accent-dim)] transition-colors"
                >
                  <span
                    className="font-mono text-sm shrink-0 w-20"
                    style={{ color: subject.color }}
                  >
                    {subject.address}
                  </span>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-mono text-lg md:text-xl font-medium text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
                        {subject.name}
                      </h2>
                      {subject.code && (
                        <span className="text-[11px] font-mono text-[var(--label)] border border-[var(--rule)] rounded-full px-2 py-0.5">
                          {subject.code}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-[var(--ink-dim)] mt-1">
                      {subject.description}
                    </p>
                  </div>

                  <div className="hidden sm:flex flex-col items-end shrink-0 text-xs font-mono text-[var(--label)]">
                    <span>{noteCount} notes</span>
          
                  </div>

                  <span className="text-[var(--label)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all">
                    →
                  </span>
                </Link>
              );
            })}
            <div className="border-t border-[var(--rule)]" />
          </div>
        </section>
      ))}

      {semesters.length === 0 && (
        <section className="max-w-5xl mx-auto px-6 py-10">
          <p className="text-[var(--ink-dim)] text-sm">
            No subjects yet — add one in{" "}
            <code className="text-[var(--amber)]">lib/subjects.ts</code>.
          </p>
        </section>
      )}

      {/* Archive — separate from semesters, career-track material */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="address-tag mb-6">BEYOND THE CURRICULUM</div>
        <Link
          href="/archive"
          className="group relative flex items-center gap-6 py-6 border-t border-[var(--rule)] hover:border-t-[var(--accent-dim)] transition-colors"
        >
          <span className="font-mono text-sm shrink-0 w-20" style={{ color: "#c99b5f" }}>
            0xF000
          </span>
          <div className="flex-1 min-w-0">
            <h2 className="font-mono text-lg md:text-xl font-medium text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">
              Archive
            </h2>
            <p className="text-sm text-[var(--ink-dim)] mt-1">
              DSA practice, interview guides — career-track, not for a specific sem.
            </p>
          </div>
          <span className="text-[var(--label)] group-hover:text-[var(--accent)] group-hover:translate-x-1 transition-all">
            →
          </span>
        </Link>
        <div className="border-t border-[var(--rule)]" />
      </section>

      <footer className="max-w-5xl mx-auto px-6 py-10 border-t border-[var(--rule)] mt-10">
        <p className="text-xs font-mono text-[var(--label)]">
          compiled with love.
        </p>
      </footer>
    </main>
  );
}
