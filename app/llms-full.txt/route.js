import { llmsFullTxt } from "@/lib/llms";

export const dynamic = "force-static";

// Full text of every landing page and guide as Markdown, for LLM ingestion.
export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
