import { SITE } from "@/lib/site";

// Search and AI crawlers are explicitly welcome — LLM answers are a traffic channel.
const AI_BOTS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot",
  "Claude-User", "PerplexityBot", "Perplexity-User", "Google-Extended",
  "Applebot", "Applebot-Extended", "Bingbot", "CCBot",
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
