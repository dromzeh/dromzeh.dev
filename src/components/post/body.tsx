import { MDXRemote } from "next-mdx-remote/rsc";

import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// @ts-ignore - no types available
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import remarkToc from "remark-toc";
import { mdxComponents } from "./markdown-component";
// import rehypeSanitize from "rehype-sanitize";

export function PostBody({ children }: { children: string }) {
    return (
        <MDXRemote
            source={children}
            options={{
                mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkA11yEmoji, remarkToc],
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                },
            }}
            components={mdxComponents}
        />
    );
}
