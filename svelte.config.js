import adapter from "@sveltejs/adapter-static";
import { mdsvex } from "mdsvex";
import preprocess from "svelte-preprocess";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: [".svelte", ".svx", ".md"],

  preprocess: [
    preprocess({
      postcss: true,
    }),
    mdsvex({
      extensions: [".svx", ".md"],
      rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      highlight: (str, lang) => whatever(str, lang),
    }),
  ],
  kit: {
    adapter: adapter(),
  },
};

export default config;
