import getPosts from "~/lib/posts/fetch-posts";
import { PostModalRenderer } from "./post-modal-provider";
import { PostModalSync } from "./post-modal-sync";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
// @ts-ignore - no types iirc? idk
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

export async function PostModalWrapper() {
    const posts = await getPosts();

    const postsWithSerialized = await Promise.all(
        posts.map(async (post) => {
            if (!post) return post;
            const serializedContent = await serialize(post.body || "", {
                mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkA11yEmoji, remarkToc],
                    rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
                },
            });
            return {
                ...post,
                serializedContent,
            };
        }),
    );

    return (
        <>
            <PostModalSync posts={postsWithSerialized} />
            <PostModalRenderer />
        </>
    );
}
