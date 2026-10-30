// IndexNow ping (Bing → ChatGPT / Copilot, Yandex, Seznam …) after a deploy:
//   node scripts/indexnow.mjs            → submits every URL from the live sitemap
//   node scripts/indexnow.mjs /abaya-hamburg /tr/abiye-hamburg
// The key file public/<KEY>.txt must be reachable on the live domain.

const SITE = "https://glamora.hamburg";
const KEY = "710bfbef7583d066466b5d329815add1";

async function sitemapUrls() {
  const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const args = process.argv.slice(2);
const urlList = args.length ? args.map((p) => `${SITE}${p}`) : await sitemapUrls();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} – ${urlList.length} URLs`);
