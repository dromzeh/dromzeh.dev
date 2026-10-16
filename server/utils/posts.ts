import type { H3Event } from "h3";
import { queryCollection } from "@nuxt/content/server";

export function publishedPosts(event: H3Event) {
  return queryCollection(event, "posts").where("visibility", "=", "published").order("order", "ASC");
}

export function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
