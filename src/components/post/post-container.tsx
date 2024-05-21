import getPosts from "~/lib/posts/fetch-posts";
import { PostItem } from "./post-item";

export async function PostContainer() {
    const posts = await getPosts();

    return (
        <div className="flex flex-col my-2">
            <h2 className="text-foreground text-lg font-semibold mb-2">
                Posts
            </h2>
            <p className="mb-2">
                I occasionally write about things that are somewhat interesting,
                you can check them out below.
            </p>
            <div className="flex flex-col space-y-2">
                {posts?.map((post) => <PostItem key={post.slug} {...post} />)}
            </div>
        </div>
    );
}
