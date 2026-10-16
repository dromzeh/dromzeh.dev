import tailwindcss from "@tailwindcss/vite";
import { codeTheme } from "./app/assets/code-theme";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "./shared/site";

export default defineNuxtConfig({
  compatibilityDate: "2026-08-19",
  devtools: { enabled: false },
  routeRules: {
    "/posts": { redirect: "/" },
  },
  modules: ["@nuxt/content"],
  nitro: {
    prerender: {
      routes: ["/rss.xml", "/llms.txt", "/sitemap.xml"],
      autoSubfolderIndex: false,
    },
  },
  components: [
    { path: "~/components/content", global: true, pathPrefix: false },
    { path: "~/components", pathPrefix: false, ignore: ["content/**"] },
  ],
  css: [
    "@fontsource-variable/newsreader",
    "@fontsource-variable/newsreader/wght-italic.css",
    "@fontsource-variable/inter",
    "~/assets/css/main.css",
    "~/assets/css/prose.css",
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  content: {
    build: {
      markdown: {
        highlight: {
          theme: { default: codeTheme },
          langs: ["ts", "sql", "bash", "rust", "c"],
        },
      },
    },
  },
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      title: SITE_NAME,
      meta: [{ name: "description", content: SITE_DESCRIPTION }],
      script: [
        {
          type: "application/ld+json",
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "@id": `${SITE_URL}/#person`,
            name: "Marcel Elias",
            alternateName: "dromzeh",
            url: SITE_URL,
            jobTitle: ["Software Engineer", "CEO"],
            worksFor: { "@type": "Organization", name: "Antifield", url: "https://antifield.com" },
            sameAs: ["https://github.com/dromzeh", "https://x.com/dromzeh"],
          }),
        },
      ],
    },
  },
});
