import getPosts, { getPost } from "~/lib/posts/fetch-posts";
import { PostBody } from "~/components/post/body";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
    const posts = await getPosts();

    return posts.map((post) => ({
        id: post!.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = params;
    const post = await getPost(id);

    if (!post) return notFound();

    return {
        title: `${post.title} • dromzeh.dev`,
        description: post.description,
        metadataBase: new URL("https://dromzeh.dev"),
    };
}

type Props = {
    params: { id: string };
};

async function PostPage({ params: { id } }: Props) {
    const post = await getPost(id);

    if (!post) return notFound();

    const [day, month, year] = post.date.split("-");

    const formattedDate = new Date(
        `${month}-${day}-${year}`,
    ).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    // const readTime = Math.ceil(post?.body!.split(" ").length / 200);

    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-24 px-6 text-sm">
                <div className="flex flex-col space-y-8">
                    <div className="flex flex-row space-x-2 items-center justify-between group">
                        <span className="text-neutral-500">
                            <Link
                                href="/"
                                className="text-foreground group-hover:text-muted-foreground/50 transition-colors duration-150 hover:cursor-pointer"
                            >
                                Go Back
                            </Link>
                        </span>
                        <div className="flex-grow border-t border-dotted border-gray-400"></div>
                        <span className="text-muted-foreground">
                            {formattedDate}
                        </span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-foreground text-2xl font-semibold">
                            {post.title}
                        </h1>
                    </div>
                </div>
                <section className="flex flex-col space-y-2 mt-8 max-w-xl">
                    <PostBody>{post.body!}</PostBody>
                </section>
            </div>
        </div>
    );
}

export default PostPage;
