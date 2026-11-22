import { buildSearchIndex } from "@/lib/search-index";

// Built once at deploy time and served as a plain file.
export const dynamic = "force-static";

export function GET() {
  return Response.json(buildSearchIndex());
}