import { SITE_URL } from "#shared/site";

const PAGES = ["/", "/craft", "/faq"];

export default defineEventHandler(async (event) => {
  const posts = await publishedPosts(event).select("path").all();

  const urls = [...PAGES, ...posts.map((post) => post.path)]
    .map((path) => `  <url><loc>${escapeXml(SITE_URL + path)}</loc></url>`)
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urls,
    "</urlset>",
    "",
  ].join("\n");

  setHeader(event, "content-type", "application/xml; charset=utf-8");
  return xml;
});
