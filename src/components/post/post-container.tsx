import getPosts from "~/lib/posts/fetch-posts";
import { PostItem } from "./post-item";
import { Post } from "~/lib/types";

export async function PostContainer() {
    const posts = await getPosts();

    return (
        <>
            {posts.map((post: Post) => (
                <PostItem key={post.slug} {...post} />
            ))}
        </>
    );
}
