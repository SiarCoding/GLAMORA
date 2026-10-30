import { llmsTxt } from "@/lib/llms";

export const dynamic = "force-static";

// llms.txt (llmstxt.org): a plain-text brief for LLM crawlers, see lib/llms.js.
export function GET() {
  return new Response(llmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
