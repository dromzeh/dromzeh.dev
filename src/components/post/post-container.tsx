import getPosts from "~/lib/posts/fetch-posts";
import { PostItem } from "./post-item";
import { Post } from "~/lib/types";

export async function PostContainer() {
    const posts = await getPosts();

    return (
        <div>
            <h2 className="text-foreground font-bold text-lg mb-2">Writings</h2>
            <div className="flex flex-col space-y-2">
                {posts?.map((post: Post) => (
                    <PostItem key={post.slug} {...post} />
                ))}
            </div>
        </div>
    );
}
