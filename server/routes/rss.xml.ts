import { SITE_NAME, SITE_URL } from "#shared/site";

export default defineEventHandler(async (event) => {
  const posts = await publishedPosts(event).select("path", "title", "summary").all();

  const items = posts
    .map((post) => {
      const link = `${SITE_URL}${post.path}`;
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${escapeXml(link)}</link>`,
        `      <guid isPermaLink="true">${escapeXml(link)}</guid>`,
        `      <description>${escapeXml(post.summary)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${SITE_NAME} (Marcel Elias)</title>`,
    `    <link>${SITE_URL}</link>`,
    "    <description>Writing from Marcel Elias</description>",
    `    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  setHeader(event, "content-type", "application/rss+xml; charset=utf-8");
  return xml;
});
