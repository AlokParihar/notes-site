# Alok's Notes — memory map

A site for your notes and assignments. Written once in Markdown, pushed to
GitHub, live on the internet automatically.

## Adding a new note or assignment (no code)

1. Go to `content/<subject>/notes/` or `content/<subject>/assignments/`
2. Create a new file, e.g. `arrays.md`
3. Start it with this block (fill in your own values), then write normally below:

```md
---
title: "Arrays"
date: "2026-07-20"
tags: ["arrays", "memory"]
summary: "One-line description shown in the list view."
status: "done"
---

## Your heading

Normal markdown. Code blocks work:

\`\`\`c
int arr[5] = {1, 2, 3, 4, 5};
\`\`\`
```

- `status` is optional — only really useful for assignments (`done`, `in-progress`, or leave it out).
- `tags` is optional — leave as `[]` if you don't want any.
- Save the file, commit, push. Vercel rebuilds the site in ~30 seconds.

## Adding a new subject

Open `lib/subjects.ts` and add one entry to the array — that's the only code
file you'll ever need to touch. Then create matching folders:

```
content/<your-subject-slug>/notes/
content/<your-subject-slug>/assignments/
```

## Running locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploying to Vercel (free)

1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import the repo
3. Leave all settings default (Next.js is auto-detected) → Deploy
4. Every future `git push` auto-deploys

## Structure

```
content/
  c-programming/
    notes/*.md
    assignments/*.md
lib/
  subjects.ts     ← list of subjects (edit this to add a subject)
  content.ts      ← reads + parses markdown (don't need to touch)
app/
  page.tsx                        ← homepage
  [subject]/page.tsx               ← subject listing
  [subject]/[kind]/[slug]/page.tsx ← individual note/assignment
```
