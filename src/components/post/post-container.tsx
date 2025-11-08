import getPosts from "~/lib/posts/fetch-posts";
import { PostItem } from "./post-item";
import { Post } from "~/lib/types";

export async function PostContainer() {
    const posts = await getPosts();

    return (
        <section>
            {/* <h2 className="text-foreground text-sm font-medium mb-4">Posts</h2> */}
            <div className="space-y-3">
                {posts?.map((post: Post) => (
                    <PostItem key={post.slug} {...post} />
                ))}
            </div>
        </section>
    );
}
