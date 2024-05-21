import matter from "gray-matter";
import type { Post } from "../types";
// import { unstable_cache as cache } from "next/cache";

export const getPosts = async () => {
    const posts = await fetch("https://api.dromzeh.dev/posts").then((res) =>
        res.json(),
    );

    return posts.posts as Post[];
};

export async function getPost(slug: string) {
    const post = await fetch(`https://api.dromzeh.dev/posts/${slug}`).then(
        (res) => res.json(),
    );

    const { data, content } = matter(post.content);

    return { ...data, body: content } as Post;
}

export default getPosts;
