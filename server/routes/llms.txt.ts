import { execFileSync } from "node:child_process";

const SOURCE = "server/assets/llms.txt";

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function lastUpdated(): string {
  try {
    const git = (...args: string[]) =>
      execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (git("status", "--porcelain", "--", SOURCE)) return today();
    return git("log", "-1", "--format=%cs", "--", SOURCE) || today();
  } catch {
    return today();
  }
}

export default defineEventHandler(async (event) => {
  const text = await useStorage("assets:server").getItem<string>("llms.txt");
  if (!text) throw createError({ statusCode: 404 });

  setHeader(event, "content-type", "text/plain; charset=utf-8");
  return String(text).replace("{{lastUpdated}}", lastUpdated());
});
